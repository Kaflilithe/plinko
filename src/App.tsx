import { Plinko } from './widgets/Plinko/Plinko';

function App() {
  return (
    <main className='h-screen flex flex-col'>
     <div className='h-[60vh]'>
        <Plinko className='w-full h-full' />
     </div>
     <div className='flex-1'>
      <button className=''>btn</button>
     </div>
    </main>
  )
}

export default App
