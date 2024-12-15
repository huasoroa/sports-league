import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import ClubAddForm from './ClubAddForm';

const ClubNewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <ClubAddForm />;
};

export default ClubNewPage;
