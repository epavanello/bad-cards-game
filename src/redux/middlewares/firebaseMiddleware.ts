import { MiddlewareAPI, Dispatch } from 'redux';
import { Firebase } from '../../FirebaseContext';
import {
  GameActionTypes,
  GAME_HOSTED,
  GAME_JOINED,
  GAME_EXITED,
  GAME_START,
  GAME_SEND_SELECTED,
  GAME_SEND_WINNER,
  ErrorType,
  SIGNUP,
  NEW_USERNAME,
  LOGIN,
} from '../actionTypes/gameTypes';
import Axios from 'axios';
import { userLoaded, joinGame, gameStarted, updatePlayers, newRound, error, newUsername } from '../actions/gameActions';
import { Subscription } from 'rxjs';

export default function firebaseMiddleware(firebase: Firebase) {
  const middleware = function middleware(params: MiddlewareAPI) {
    const { dispatch /* getState */ } = params;
    let newPlayersSubscription: Subscription | null = null;
    let newRoundSubscription: Subscription | null = null;

    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        firebase.uid = user.uid;

        firebase.loadCards();

        user.getIdToken(true).then((idToken) => {
          Axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
        });
        dispatch(userLoaded(true, user.uid, user.displayName || ''));
      } else {
        dispatch(userLoaded(false, '', ''));
      }
    });

    return function (next: Dispatch) {
      return async function (action: GameActionTypes) {
        switch (action.type) {
          case LOGIN:
            firebase.doSignInWithEmailAndPassword(action.payload.email, action.payload.password).catch((e) => {
              dispatch(error(e.message, 'Login error', ErrorType.LOGIN));
            });

            break;
          case SIGNUP:
            firebase
              .doCreateUserWithEmailAndPassword(action.payload.email, action.payload.password)
              .then(() => {
                dispatch(newUsername(action.payload.username));
              })
              .catch((e) => {
                dispatch(error(e.message, 'Signup error', ErrorType.SIGNUP));
              });
            break;
          case NEW_USERNAME:
            firebase.changeUsername(action.payload.username);
            break;
          case GAME_HOSTED:
            (async () => {
              await firebase.enterRoom(action.payload.roomID);
              dispatch(joinGame(action.payload.roomID));
            })();
            break;
          case GAME_JOINED:
            (async () => {
              try {
                await firebase.enterRoom(action.payload.roomID);
                firebase.notifyOnGameStart().then((started) => {
                  dispatch(gameStarted(started));
                });
                newRoundSubscription = firebase.notifyNewRound$().subscribe((newRoundData) => {
                  const { round, cards, role, blackCard, judgeID } = newRoundData;
                  dispatch(newRound(round, cards, role, blackCard, judgeID));
                });

                newPlayersSubscription = firebase.notifyNewPlayers$().subscribe((players) => {
                  dispatch(updatePlayers(players));
                });
              } catch (e) {
                dispatch(error('Cannot join the game', 'Join game', ErrorType.JOIN));
              }
            })();
            break;
          case GAME_START:
            await firebase.startGame();
            break;
          case GAME_EXITED:
            newRoundSubscription?.unsubscribe();
            newPlayersSubscription?.unsubscribe();
            await firebase.exitRoom();
            break;
          case GAME_SEND_SELECTED:
            firebase.sendSelected(action.payload.cards);
            break;
          case GAME_SEND_WINNER:
            await Axios.post('/game/sendWinner', {
              player: action.payload.player.uid,
              roomID: firebase.roomID,
            });
            break;
        }
        return next(action);
      };
    };
  };

  return middleware;
}
