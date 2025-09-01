
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from init import api_router

app = FastAPI(title="Bloom API", version="1.0.0")
origins = [
    "http://127.0.0.1:5500", # VS Code Live Server
    "null" # Allow requests from local files (file://)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Bloom API is running 🚀"}
