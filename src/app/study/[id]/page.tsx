import React from 'react';
import StudyWorkspacePage from '../page';

export default function StudySessionPage({ params }: { params: { id: string } }) {
  // Re-uses the study workspace with the active session parameter
  return <StudyWorkspacePage />;
}
