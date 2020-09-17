import React from 'react';

import Table, { INewTableProps, GenericExample } from '../Table';

export const StoryTable: React.FC<INewTableProps<GenericExample>> = props => {
  return <Table {...props} />;
};
