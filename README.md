# sedJS
A  semi sed-substitution CLI on node 

# We got a shebang so....

so you can start the application just by typing ---->  `sedJS  ...`

but before  run `npm link` on the project 



exmamples : 


sedJS -e 'S/a/100/Iwtext' file.txt  --> creates file text

sedJS -e 's/A/100/' -e 's/0/5/g' file.txt  --> multiple option -e

sedJS -f comandos.txt file.txt --> commands from file

# By now just one file can be provided 

sedJS -f comandos.txt -e 's/a/XYZ/' file.txt --> apply f and e commands


using w flag, the content on the right
 side of w will be the name of the file,
 if not provided one is taken by default bak.up
