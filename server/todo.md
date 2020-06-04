Servizi:                                Server:                                                                 Redux:
- 1.h host game                         Create room & join host (<- return roomID)                              roomID, isHost, inRoom
- 1.p join game                         Check if in starting and join player or deny connection                 roomID, inRoom
- 3.h start game                        set room started if players are more that 3 or deny                     gameStarted
- 5.  get cards & roles                 return set of cards
- 6.p send cards                        set on room selected cards

RTDB:
- 2.  listen for players    (room/${roomID}/Players) {label, played}                                            Players
- 4.p listen for start game (room/${roomID}/started)                                                            gameStarted
- 5.j listen for all players played