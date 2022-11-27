# NodeShell

---

## How to run:

```bash
git clone
cd NodeShell
npm i
node shell.js
```

## Helper files

---

A demo server with express is created to emulate a long running process.
app.js arguments

```bash
node app.js -PORT_NO -SERVER_ALIVE_TIME_IN_SECONDS -ARG_STRING
#example
node app.js 5000 60 Server_no_1
```

| Argument                     | Description                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| PORT_NO                      | Specifies at which port the server runs default 5000                                                             |
| SERVER_ALIVE_TIME_IN_SECONDS | Time to live for server in seconds before it exits with code 1 default time 60 seconds                           |
| ARG_STRING                   | helper variable that will be displayed on html to know which server is currently running default value 'default' |

## Ctrl + Z does not work in windows systems.

---

As SIGSTOP and SIGCONT signals won't work on win32 systems
Workaround implemented
