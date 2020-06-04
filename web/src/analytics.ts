import ReactGA from 'react-ga';
import history from './history';

if (process.env.NODE_ENV !== 'development') {
  const trackingId = 'UA-163963965-1';
  ReactGA.initialize(trackingId);

  ReactGA.pageview(window.location.pathname + window.location.search);

  history.listen((location) => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
}

export default ReactGA;
