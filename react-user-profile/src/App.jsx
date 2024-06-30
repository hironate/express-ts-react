import './App.css';
import UserProfile from './UserProfile';

function App() {
  return (
    <UserProfile
      name="John Doe"
      imageSrc="https://i.pravatar.cc/300"
      bio="A passionate full-stack developer with over 3 years of experience."
      email="john.doe@example.com"
    />
  );
}

export default App;
