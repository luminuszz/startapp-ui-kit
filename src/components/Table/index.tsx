/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './styles.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import React, { useMemo } from 'react';

interface IOption<IRowType> {
  label: string;
  value: keyof IRowType;
}

export interface ITableConfig<IRowType> {
  // tslint:disable-next-line:array-type
  tableColumns: IOption<IRowType>[];
  tableTitle: string;
  pageOffSet: number;
  loading: boolean;
  tableHeaderSticky?: boolean;
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

const NewTable: React.FC<INewTableProps<api.BudgetRequest>> = ({
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
              <img src="/search.svg" alt="search-icon" />
              <input
                type="text"
                placeholder={filterConfig.input?.placeHolder}
              />
            </div>

            <div className="select-filter">
              <select name="filter" id="filter">
                <option aria-selected="true">
                  {filterConfig.select?.initialValue}
                </option>
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
            <tr
              className={
                tableConfig.tableHeaderSticky ? 'sticky-table-header' : ''
              }
            >
              {!tableConfig.tableHeaderSticky && <td scope="col" />}

              {tableConfig.tableColumns.map((column, index) => (
                <td scope="col" key={index}>
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

      {tablePopulate?.length === 0 && (
        <div className="message-info">
          <span>Não á dados</span>
        </div>
      )}
      <div className="table-footer">
        <div className="paginate">
          <span>{formatePage}</span>
          <button type="button" onClick={onClickPreviousPage}>
            <img src="/left-arrow.svg" alt="Previous" />
          </button>
          <button type="button" onClick={onClickNextPage}>
            <img src="/next.svg" alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewTable;
