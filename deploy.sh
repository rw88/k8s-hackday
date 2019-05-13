docker build -t rw88/multi-client:latest -t rw88/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t rw88/multi-server:latest -t rw88/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t rw88/multi-worker:latest -t rw88/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push rw88/multi-client:latest
docker push rw88/multi-server:latest
docker push rw88/multi-worker:latest

docker push rw88/multi-client:$SHA
docker push rw88/multi-server:$SHA
docker push rw88/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=rw88/multi-server:$SHA
kubectl set image deployments/client-deployment client=rw88/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=rw88/multi-worker:$SHA