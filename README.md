# @teqfw/web-api

## Disclaimer

This package is a part of the [Tequila Framework](https://flancer32.com/what-is-teqfw-f84ab4c66abf) (TeqFW). The TeqFW
is currently in an early stage of development and should be considered unstable. It may change rapidly, leading to
breaking changes without prior notice. Use it at your own risk. Please note that contributions to the project are
welcome, but they should only be made by those who understand and accept the risks of working with an unstable
framework.

## Overview

TeqFW plugin to use synchronous requests to backend services in teq-apps.

This `teq`-plugin contains web requests handler that processes synchronous POST/GET requests with JSON payload to
backend services (like regular REST).

### Namespace

This plugin uses `TeqFw_Web_Api` namespace.

## Install

```shell
$ npm i @teqfw/web-api --save 
```

## Namespace

This plugin uses `TeqFw_Web_Api` namespace.

## `teqfw.json`

[DTO](src/Back/Plugin/Dto/Desc.mjs) for `@teqfw/web-api` nodes in `teq`-plugins descriptors.

```json
{
  "@teqfw/web-api": {}
}
```

## `./cfg/local.json`

[DTO](src/Back/Dto/Config/Local.mjs) for `@teqfw/web-api` node.
