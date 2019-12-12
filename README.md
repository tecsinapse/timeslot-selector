# Iniciando

[![Build Status](https://travis-ci.org/tecsinapse/timeslot-selector.svg?branch=master)](https://travis-ci.org/tecsinapse/timeslot-selector)



***@tecsinapse/timeslot-selector*** é um componente `React` seletor de horários disponíveis em uma agenda

## Get Started

Para acessar os documentos acesse nosso [storybook](https://github.com/tecsinapse/timeslot-selector)

É recomendável utilizar uma versão `"node": ">=12.0.0"` devido a performance de build superior

Para add em seu projeto:
```
    yarn add @tecsinapse/timeslot-selector
```

E adicione o ThemeProvider em seu projeto como abaixo:

```
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@tecsinapse/ui-kit";
import { TimeslotSelector } from "@tecsinapse/timeslot-selector";

ReactDOM.render(
  <ThemeProvider variant="black">
    <TimeslotSelector />
  </ThemeProvider>,

  document.getElementById("root")
);
```

### Desenvolvimento

Para rodar localmente
```
    yarn install && yarn start
```

Para buildar e publicar a lib:
```
    bumped release $VERSAO
```

Para rodar o app de exemplo, fazer o link da lib na pasta de exemplo após executar o build:
```
    yarn build && yarn link
    cd example/
    yarn link @tecsinapse/timeslot-selector
    yarn install && yarn start
```

As modificações na lib serão refletidas após build da lib.
