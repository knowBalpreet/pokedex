This project required python 3.7 to work

1. Setup virtual env
   `virtualenv -p python3 venv3`
2. Activate virtualenv
3. pip install -r requirements.txt
4. python main.py

Use via DOCKER

1. docker build -t pokedex_backend .
2. docker run -d --name pokedex_backend -p 8081:8081 -e BIND='0.0.0.0:8081' pokedex_backend ; docker logs -f pokedex_backend

This should start an api server at http://localhost:8081
Docs can be viewed at http://localhost:8081/docs
