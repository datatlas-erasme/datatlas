export default {
  // Datatlas
  'dashboard.my_projects': 'My projects',
  'dashboard.community_projects': 'Community',
  'about.title': 'About',
  'createProjectForm.mapStyle': 'Select a map style',
  'createProjectForm.projectName': 'Name of the project',
  'createProjectForm.submit': 'Create',
  'createProjectForm.titleRequired': 'This field is required',
  'loginForm.errors.loginRequired': 'This field is required',
  'loginForm.errors.passwordRequired': 'This field is required',
  'loginForm.forgotPassword': 'I forgot my password',
  'loginForm.login': 'Login',
  'loginForm.password': 'Password',
  'loginForm.rememberMe': 'Remember me',
  'loginForm.submit': 'Login',
  'loginForm.unauthorized': 'Invalid credentials',
  'navigationBar.help': 'Help',
  'navigationBar.logout': 'Logout',
  'navigationBar.settings': 'Settings',
  'project.contributors': 'Contributors',
  'project.projectUpdated': 'Updated at',
  'sideBar.createProject': 'Start new project:',
  'layerManager.dataWeight': 'Too many datasets can corrupt the project',
  'filterManager.filter.make_public.label': 'Make this filter public',
  'filterManager.filter.make_public.tooltip': 'Show filter to visitors',
  'map_menu.title': 'Datasets',
  'map_menu.dataset.infos': 'Dataset infos',
  'map_menu.dataset.show_dataset': 'Show dataset',
  'map_control.publish': 'Publish',
  'map_control.unpublish': 'Unpublish',
  'modal.title.deleteProject': 'Delete project',
  loadRemoteData: {
    incorrectURL: 'Incorrect URL',
    submit: 'Load',
    description:
      'You may import datasets from **[data.grandlyon.com](https://data.grandlyon.com/)**.\n\n' +
      'Accepted file formats are : {fileFormatNames}... Be sure the file extension appears in the URL.\n\n' +
      "If desired format isn't available, [contact us](mailto:{contactEmail}).\n\n",
  },

  // Kepler
  'sidebar.panels.layer': 'Data',
  'sidebar.panels.filter': 'Filter',
  'sidebar.panels.interaction': 'Interface',
  fileUploader: {
    disclaimer: ' ',
    configUploadMessage:
      'You may upload files of the following formats {fileFormatNames}. \n\n' +
      "If the desired format isn't available, [**contactez us**](mailto:{contactEmail}). \n\n" +
      '*You may as well consult **Kepler.gl** documentation on [**accepted file formats**]({fileFormatDocLink}).*',
    browseFiles: 'parcourir vos fichiers',
    uploading: 'Téléchargement en cours',
    fileNotSupported: "Le fichier {errorFiles} n'est pas pris en charge.",
    or: 'ou',
  },
};
