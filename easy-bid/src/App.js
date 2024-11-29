import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgotPassword from './components/Auth/ForgotPassword';
import Onboarding from './components/Auth/OnBoarding';
import QuotePrompt from './components/Quotes/QuotePrompt';
import WaitingList from './components/Quotes/WaitingList';
import QuoteList from './components/Quotes/QuoteList';
import QuoteDetails from './components/Quotes/QuoteDetails';
import QuoteAnswer from './components/Quotes/QuoteAnswer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />}/>
        <Route path="/quote-prompt" element={<QuotePrompt />}/>
        <Route path="/waiting-list" element={<WaitingList />}/>
        <Route path="/quote-list" element={<QuoteList />}/>
        <Route path="/quote-details/:id" element={<QuoteDetails />}/>
        <Route path="/quote-answer/:id" element={<QuoteAnswer />} />

      </Routes>
    </Router>
  );
};

export default App;
