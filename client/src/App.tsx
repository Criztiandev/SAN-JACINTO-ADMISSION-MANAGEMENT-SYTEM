import Button from './components/Button'
import IconButton from './components/IconButton'
import Logo from './assets/react.svg'

function App () {
  return (
    <>
      <Button variant='ghost'>Submit</Button>
      <IconButton icon={Logo} rounded />
    </>
  )
}

export default App
