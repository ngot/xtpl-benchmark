# benchmark for xtpl

## dependencies

```
npm install
```

## fibjs

```
fibjs fib-workers.js
```

and then 

```
wrk -c10 -t2 -d10 --latency  http://127.0.0.1:8000
```

## Node.js

```
node node-cluster.js
```

and then 

```
wrk -c10 -t2 -d10 --latency  http://127.0.0.1:8000
```
