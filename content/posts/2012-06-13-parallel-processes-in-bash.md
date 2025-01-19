+++
title = 'Parallel Processes In Bash'
categories = ['bash']
+++
I wrote a script to speed up MySQL imports. I'll write more on this later, but for now I want to focus on background and parallel processes in Bash. Part of the script loads tables at the same time, trying to speed up the import. You can have multiple processes in Bash by sending them to the background using the `&` character.

{{< highlight bash >}}
for table in TABLES; do
	import_table $table &
done
{{< /highlight >}}

The above example will send all of your process to the background. If you have a lot of process (assuming the process takes some time and resources), this is going to slow down your system, and potentially crash it. Instead, I wanted to only run 4 commands at the same time. First I tried making a pid for each background process. Then when an table started, it would check for the number of pids. If it was less then the threads specified, it would start one, otherwise it would wait.

{{< highlight bash >}}
import_table() {
	table="$1"
	while [[ `ls *.pid | wc -l | tr -d ' '` -ge 4 ]]; then sleep 5; done
	echo $PPID > $table.pid
	# import
	rm $table.pid
}

for table in TABLES; do
	import_table $table &
done
{{< /highlight >}}

While this solution did what I wanted, it left a lot of processes still running. I did a little digging and found a solution to fire off another process when one died. By using a named pipe, you can do better parallel processes in Bash, and it's really simple to do.

{{< highlight bash >}}
mkfifo pipe
exec 3<>pipe
rm -f pipe

{ sleep 1; echo >&3; } &
{ sleep 2; echo >&3; } &
{ sleep 3; echo >&3; } &
{ sleep 4; echo >&3; } &

while read; do
	{ process_func; echo >&3; } &
done <&3
{{< /highlight >}}

This script makes a named pipe, assigns it to the 3 descriptor for reads and writes and removes the pipe (it will keep intact until the script is done). I'm then firing up 4 processes, offsetting them so they don't all start at the same time. The while loop will then read every time the pipe is written to (when ever the process is done) and run the loop. This way we only have 4 sub-processes running at a time.

There are a lot more cool things you can do with named pipes, I would recommend reading up on them.
