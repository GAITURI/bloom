from fastapi import APIRouter
import journal

api_router = APIRouter()
api_router.include_router(journal.router, prefix="/api", tags=["Journal"])
