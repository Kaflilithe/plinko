import { EventBus, PlinkoEvent } from './widgets/Plinko/EventBus.ts';
import { Plinko } from './widgets/Plinko/Plinko';

function App() {

  const kickBall = () => {
    EventBus.emit(PlinkoEvent.KICK_BALL);
  }

  return (
    <main className='h-screen flex flex-col'>
     <div className='h-[60vh]'>
        <Plinko className='w-full h-full' />
     </div>
     <div className='flex-1 flex flex-col'>
        <div className='flex-1 flex items-center justify-center'>
          <button className='w-[200px] h-[200px] rounded-full' onClick={kickBall}>btn</button>
        </div>
     </div>
    </main>
  )
}

export default App
