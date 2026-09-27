import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { Form } from './Form.jsx'
import { Card } from './Card.jsx'
import { Button } from './Button.jsx'

function App() {
  const handleClick = () => {
    alert('Button clicked!')
  }

  return (
    <div>
      <Header title="My React App" />

      <Card
        name="Annie Mandal"
        title="Software Engineer"
        bio="Passionate software engineer with experience in React and Node.js."
      />

      <Button
        text="Click Me"
        onClick={handleClick}
      />

      <Form />

      <Footer text="© 2024 My React App" />
    </div>
  )
}

export default App