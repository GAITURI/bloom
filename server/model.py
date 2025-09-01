from pydantic import BaseModel
from typing import Optional

class JournalEntry(BaseModel):
    user_id: str
    content: str
    mood: Optional[str] = None

class JournalAnalysis(BaseModel):
    entry_id: int
    sentiment: str
    emotions: Optional[dict] = None
    keywords: Optional[dict] = None
    risk_flags: Optional[dict] = None
    suggestions: Optional[str] = None
