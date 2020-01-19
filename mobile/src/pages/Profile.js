import React from 'react';
import { WebView } from 'react-native-webview';

const urlGithub = 'https://github.com/'

function Profile({ navigation }) {
    const githubUserName = navigation.getParam('github_username')
    return <WebView style={{ flex: 1 }} source={{ uri: urlGithub + githubUserName }} />
}
export default Profile;