// eslint-disable-next-line import/no-extraneous-dependencies
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { StoryTable } from '../components/storiesTable';

const data = [
  {
    email: 'julioteste@teste',
    design: 'teste design',
    id: 'dsadasd',
    name: 'Julio dos santoss',
    projectType: 'PWA',
  },
  {
    email: 'julioteste@teste',
    design: 'teste design',
    id: 'dsadasd',
    name: 'Julio dos santoss',
    projectType: 'PWA',
  },
  {
    email: 'julioteste@teste',
    design: 'teste design',
    id: 'dsadasd',
    name: 'Julio dos santoss',
    projectType: 'PWA',
  },
  {
    email: 'julioteste@teste',
    design: 'teste design',
    id: 'dsadasd',
    name: 'Julio dos santoss',
    projectType: 'PWA',
  },
  {
    email: 'julioteste@teste',
    design: 'teste design',
    id: 'dsadasd',
    name: 'Julio dos santoss',
    projectType: 'PWA',
  },
];

storiesOf('NewTable', module)
  .addDecorator(withInfo)
  .add('Table', () => (
    <StoryTable
      tablePopulate={data}
      tableConfig={{
        loading: false,
        pageOffSet: 5,
        tableTitle: 'Tabela Exemplo',
        tableColumns: [
          {
            label: 'E-mail',
            value: 'email',
          },
          {
            label: 'Nome',
            value: 'name',
          },
          {
            label: 'Design',
            value: 'design',
          },
          {
            label: 'Tipo de projeto',
            value: 'projectType',
          },
        ],
      }}
    />
  ));
