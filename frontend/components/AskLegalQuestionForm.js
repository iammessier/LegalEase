// components/AskLegalQuestionForm.js
import { useState } from 'react';

const AskLegalQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || !name || !email) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/legal-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, name, email }),
      });

      if (!response.ok) throw new Error('Failed to submit the question');
      
      // Handle success (clear form, show message, etc.)
      setQuestion('');
      setName('');
      setEmail('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
        placeholder="Ask your legal question" 
      />
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Your Name" 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Your Email" 
      />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AskLegalQuestionForm;
