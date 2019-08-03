# pappuPinger
A node script that pings our university website and notifies us about changes.

### Installation

* Prerequisites
  * nodejs
  * git

  Install these using your favourite package manager if they aren’t present on your system.

* Clone the repository

  ```bash
  git clone https://github.com/mountAP/pappuPinger
  ```

* Move to the cloned folder

  ```bash
  cd pappuPinger
  ```

* Install dependencies

  ```bash
  npm install
  ```



  ### Start `pinger.js`

```bash
node pinger.js
```

* Rest will self explanatory.  Don’t worry.



#### Bonus for Termux Users

You get a system notification if you have `termux-api` installed. 



#### Extending the script

You may use the script with any of the websites to monitor text changes. Just change the `url` inside `pinger.js`.  **Caution** The script may keep notifying changes if the website uses hashes.



#### Project name justification

Ours is a cool University, called PPU (Patliputra University), situated at the heart of Bihar. Very affectionately, we like to call it “Pappu University” and hence the project name.