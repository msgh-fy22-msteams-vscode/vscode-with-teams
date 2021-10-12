// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, window } from 'vscode';
import TeamsChat from './teams-chat';
import { SHOW_MENU_ITEM_COMMAND } from './contants';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ extensionPath, subscriptions }: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-with-teams" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = commands.registerCommand('vscode-with-teams.openTeamsChat', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    window.showInformationMessage('Hello World from VSCode with Teams!');
  });

  const teamsChat: TeamsChat = new TeamsChat(extensionPath);

  subscriptions.push(
    disposable,
    teamsChat.statusBarItem,
    commands.registerCommand(SHOW_MENU_ITEM_COMMAND, () => teamsChat.openTeamsChatView()),
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
