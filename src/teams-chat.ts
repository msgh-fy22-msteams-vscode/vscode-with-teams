import { StatusBarAlignment, StatusBarItem, Uri, ViewColumn, WebviewPanel, window } from 'vscode';
import { join } from 'path';
import { OPEN_CHAT_COMMAND, SHOW_MENU_ITEM_COMMAND } from './contants';

export default class TeamsChat {
  private _statusBarItem: StatusBarItem;
  private _extensionPath: string;

  constructor(extensionPath: string) {
    this._extensionPath = extensionPath;
    this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 1000);
    this._statusBarItem.command = SHOW_MENU_ITEM_COMMAND;
    this._statusBarItem.text = '🌐 VS Code with Teams';
    this._statusBarItem.show();
  }

  get statusBarItem(): StatusBarItem {
    return this._statusBarItem;
  }

  openTeamsChatView() {
    const panel: WebviewPanel = window.createWebviewPanel('showTeamsChat', 'Microsoft Teams', ViewColumn.Two, {
      enableScripts: true,

      localResourceRoots: [Uri.file(join(this._extensionPath, 'teamsChatViewer'))],
    });

    const reactAppPathOnDisk = Uri.file(join(this._extensionPath, 'teamsChatViewer', 'teamsChatViewer.js'));
    const reactAppUri = reactAppPathOnDisk.with({ scheme: 'vscode-resource' });

    panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Config View</title>

        <meta http-equiv="Content-Security-Policy"
              content="default-src 'none' https://random-data-api.com/;
                      img-src https:;
                      script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                      style-src vscode-resource: 'unsafe-inline';">

        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
        </script>
      </head>
      <body>
        <div id="root"></div>
        <script src="${reactAppUri}"></script>
      </body>
    </html>`;
  }
}
