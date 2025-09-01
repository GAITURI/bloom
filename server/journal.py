from fastapi import APIRouter, HTTPException
from model import JournalEntry, JournalAnalysis
from supabaseClient import supabase
from postgrest import APIError

router = APIRouter()

# Create journal entry
@router.post("/journal")
async def create_entry(entry: JournalEntry):
    try:
        response = supabase.table("journal_entries").insert({
            "user_id": entry.user_id,
            "content": entry.content,
            "mood": entry.mood
        }).execute()

        if response.data:
            return {"message": "Journal entry created", "data": response.data}
        raise HTTPException(status_code=400, detail="Could not create journal entry")
    except APIError as e:
        raise HTTPException(status_code=e.code, detail=e.message)


# Fetch all entries for a user
@router.get("/journal/{user_id}")
async def get_entries(user_id: str):
    try:
        response = supabase.table("journal_entries").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return {"entries": response.data}
    except APIError as e:
        raise HTTPException(status_code=e.code, detail=e.message)


# Add analysis for an entry
@router.post("/analysis")
async def create_analysis(analysis: JournalAnalysis):
    try:
        response = supabase.table("journal_analyses").insert({
            "entry_id": analysis.entry_id,
            "sentiment": analysis.sentiment,
            "emotions": analysis.emotions,
            "keywords": analysis.keywords,
            "risk_flags": analysis.risk_flags,
            "suggestions": analysis.suggestions
        }).execute()

        if response.data:
            return {"message": "Analysis added", "data": response.data}
        raise HTTPException(status_code=400, detail="Could not add analysis")
    except APIError as e:
        raise HTTPException(status_code=e.code, detail=e.message)