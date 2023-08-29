import Button from './components/Button'
import IconButton from './components/IconButton'
import Logo from './assets/react.svg'
import Input from './components/Input'

function App () {
  return (
    <>
      <Button variant='ghost'>Submit</Button>
      <IconButton icon={Logo} rounded />
      <Input title='Tite' icon='T' dir='left' />

      <h1 className='text-3xl font-bold underline text-gray-600'>
        Hello world!
      </h1>
    </>
  )
}

export default App
