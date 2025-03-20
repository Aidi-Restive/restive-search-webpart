import * as React from 'react';
// import styles from './RestiveSearchApp.module.scss';
import { IRestiveSearchAppProps } from './IRestiveSearchAppProps';
import DataGridView from './DataGrid';
// import { escape } from '@microsoft/sp-lodash-subset';

export default class RestiveSearchApp extends React.Component<IRestiveSearchAppProps, {}> {
  public render(): React.ReactElement<IRestiveSearchAppProps> {
    const {
      context
    } = this.props;

    return (
      <section>
        <DataGridView context={context}/>
      </section>
    );
  }
}
