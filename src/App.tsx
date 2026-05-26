import Home from './pages/Home';
import FollowCursor from './components/followcursor';
import BotpressChat from './BotpressChat';
export default function App() {
  return (
    <>

      <BotpressChat />
      <FollowCursor color="#A65F45" zIndex={9999} />
      <Home />
    </>
  );
}
