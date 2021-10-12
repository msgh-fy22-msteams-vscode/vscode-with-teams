import { StatusBarAlignment, StatusBarItem, ViewColumn, WebviewPanel, window } from 'vscode';
import { OPEN_CHAT_COMMAND, SHOW_MENU_ITEM_COMMAND } from './contants';

export default class TeamsChat {
  private _statusBarItem: StatusBarItem;

  constructor() {
    this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 100);
    this._statusBarItem.command = SHOW_MENU_ITEM_COMMAND;
    this._statusBarItem.text = '🌐 Hello World from VS Code';
    this._statusBarItem.show();
  }

  get statusBarItem(): StatusBarItem {
    return this._statusBarItem;
  }

  openTeamsChatView() {
    const panel: WebviewPanel = window.createWebviewPanel('showTeamsChat', 'Microsoft Teams', ViewColumn.Two, {});
    panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Config View</title>
    </head>
    <body>
        <img src="https://media.giphy.com/media/uoAn5ik8zAuqI/giphy.gif" width="300" /><br/>
        <code>Hello World</code>
    </body>
    </html>`;
  }
}
