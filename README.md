# Cities Skylines 2 EUIS Toolkit

This is a utility project to help building UI for mods from Cities Skylines 2 with the Extra UI Screens mod - EUIS. CS2 uses Coherent UI as engine, based on Chromium web browser standards but with limitations. This package was created to help with some of them, as well offers some styling matching the game CSS.

## Installation instructions

- Add this repository as a git submodule in the `UI` folder of your mod, prefer to name the folder as `_replacements`:

    ```git.exe submodule add   -- "<This repo URL>" "UI/_replacements"``` 

    - The `UI` folder is the one with all EUIS react projects.
- In each EUIS react project, add these lines to `dependencies` part on `package.json`:
```
    "@emotion/cache": "file:../_replacements/cache-11.11.0-k45.tgz",
    "react-select": "file:../_replacements/react-select-5.7.3-k45.tgz",
    "systemjs-webpack-interop": "file:../_replacements/systemjs-webpack-interop-2.3.7-euis.tgz",
    "@klyte45/euis-components": "file:../_replacements/euis-components/",
```

As the `euis-components` folder will receive new components in the future, I recommend that you create your own version of this repository since some refactoring can be done at any time. So you can prepare your projects if a breaking change get done in the future.