import React from 'react';
import Paper from '../components/Paper';
import Title from '../components/Title';

export default function NotFound() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Paper>
        <Title error>Page not found</Title>
      </Paper>
    </div>
  );
}
