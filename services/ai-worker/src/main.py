from fastapi import FastAPI
from datetime import datetime

app = FastAPI(title="SnapStudio AI Worker")

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "ai-worker",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
