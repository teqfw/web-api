# @teqfw/web-api

TeqFW plugin to use synchronous requests to backend services in teq-apps.

| CAUTION: TeqFW is an unstable, fast-growing project w/o backward compatibility. Use it at your own risk. |
| -------------------------------------------------------------------------------------------------------- |

This `teq`-plugin contains web requests handler that processes synchronous POST/GET requests with JSON payload to
backend services (like regular REST).

## Install

```shell
$ npm i @teqfw/web-api --save 
```

## Namespace

This plugin uses `TeqFw_Web_Api` namespace.

## `teqfw.json`

[DTO](src/Back/Dto/Plugin/Desc.mjs) for `@teqfw/web-api` nodes in `teq`-plugins descriptors.

```json
{
  "@teqfw/web-api": {}
}
```

## `./cfg/local.json`

[DTO](src/Back/Dto/Config/Local.mjs) for `@teqfw/web-api` node.
