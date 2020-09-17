/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/scope */
import './styles.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import React, { useMemo } from 'react';

interface IOption<IRowType> {
  label: string;
  value: keyof IRowType;
}

interface ITableConfig<IRowType> {
  // tslint:disable-next-line:array-type
  tableColumns: IOption<IRowType>[];
  tableTitle: string;
  pageOffSet: number;
  loading: boolean;
}

interface IFilterProps {
  input?: {
    placeHolder: string;
  };

  select?: {
    initialValue: string;
  };
}

export interface GenericExample {
  id: string;
  name: string;
  email: string;
  design: string;
  projectType: string;
}

export interface INewTableProps<IRowType> {
  tablePopulate?: IRowType[];
  tableConfig: ITableConfig<IRowType>;
  filterConfig?: IFilterProps;
  onClickNextPage?: () => void;
  onClickPreviousPage?: () => void;
  onClickEditIcon?: (budgetId: string) => void;
  onClickDeleteIcon?: (budgetId: string) => void;
  pushToDetails?: (budgetId: string) => void;
}

const NewTable: React.FC<INewTableProps<GenericExample>> = ({
  tableConfig,
  onClickNextPage,
  onClickDeleteIcon,
  onClickPreviousPage,
  onClickEditIcon,
  pushToDetails,
  tablePopulate,
  filterConfig,
}) => {
  const formatePage = useMemo(
    () => (tableConfig.pageOffSet === 0 ? 1 : tableConfig.pageOffSet + 1),
    [tableConfig.pageOffSet],
  );

  const actionsConditions =
    onClickDeleteIcon || onClickPreviousPage || pushToDetails;

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>{tableConfig.tableTitle}</h3>

        {filterConfig && (
          <>
            <div className="search-input">
              <img src="../assets/search.svg" alt="search-icon" />
              <input type="text" placeholder="Pesquisar" />
            </div>

            <div className="select-filter">
              <select name="filter" id="filter">
                <option aria-selected="true">Selecione uma coluna</option>
                {tableConfig.tableColumns.map((item, index) => (
                  <option key={index} aria-selected="false" value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <table className="table">
        <thead>
          {actionsConditions && (
            <tr>
              <td scope="col" />
              {tableConfig.tableColumns.map(column => (
                <td scope="col" key={column.value}>
                  {column.label}
                </td>
              ))}
            </tr>
          )}
        </thead>

        {tablePopulate && (
          <tbody>
            {tablePopulate?.map(row => (
              <tr key={row.id}>
                {actionsConditions && (
                  <td className="icons">
                    {!!onClickEditIcon && (
                      <i onClick={() => onClickEditIcon(row.id)} role="button">
                        <EditIcon />
                      </i>
                    )}
                    {!!onClickDeleteIcon && (
                      <i
                        onClick={() => onClickDeleteIcon(row.id)}
                        role="button"
                      >
                        <DeleteIcon />
                      </i>
                    )}
                    {!!pushToDetails && (
                      <i onClick={() => pushToDetails(row.id)} role="button">
                        <FindInPageIcon />
                      </i>
                    )}
                  </td>
                )}
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.design}</td>
                <td>{row.projectType}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {!tablePopulate && (
        <div className="message-info">
          <span>Message</span>
        </div>
      )}
      <div className="table-footer">
        <div className="paginate">
          <span>{formatePage}</span>
          <button type="button" onClick={onClickPreviousPage}>
            <img src="../assets/left-arrow.svg" alt="Previous" />
          </button>
          <button type="button" onClick={onClickNextPage}>
            <img src="../assets/next.svg" alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewTable;
