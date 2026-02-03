import { useState } from "react";
import { createMovieWithAPI } from "../services/movieService";
import { movies } from "../data/Movies";

export default function DataToDatabase() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
    const [results, setResults] = useState({ success: [], failed: [] });
    const [showResults, setShowResults] = useState(false);

    const uploadMovies = async () => {
        setUploading(true);
        setShowResults(false);
        setProgress({ current: 0, total: movies.length, percentage: 0 });
        setResults({ success: [], failed: [] });

        const successList = [];
        const failedList = [];

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];

            try {
                setProgress({
                    current: i + 1,
                    total: movies.length,
                    percentage: Math.round(((i + 1) / movies.length) * 100)
                });

                const result = await createMovieWithAPI(movie);

                if (result.success) {
                    successList.push({ name: movie.name, id: movie.id });
                } else {
                    failedList.push({
                        name: movie.name,
                        id: movie.id,
                        error: result.error
                    });
                }

                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (error) {
                failedList.push({
                    name: movie.name,
                    id: movie.id,
                    error: error.message
                });
            }
        }

        setResults({ success: successList, failed: failedList });
        setUploading(false);
        setShowResults(true);
    };

    const resetUpload = () => {
        setProgress({ current: 0, total: 0, percentage: 0 });
        setResults({ success: [], failed: [] });
        setShowResults(false);
    };

    return (
        <div className="ctm-bulk-upload-container">
            <div className="ctm-bulk-header">
                <h2 className="ctm-bulk-title">
                    <span className="ctm-bulk-icon">📤</span>
                    Bulk Movie Upload
                </h2>
                <p className="ctm-bulk-subtitle">
                    Upload {movies.length} movies to database
                </p>
            </div>

            {!uploading && !showResults && (
                <button
                    onClick={uploadMovies}
                    className="ctm-bulk-upload-btn"
                >
                    <span className="ctm-upload-icon">🚀</span>
                    <span>Start Upload ({movies.length} Movies)</span>
                </button>
            )}

            {uploading && (
                <div className="ctm-progress-container">
                    <div className="ctm-progress-info">
                        <span className="ctm-progress-text">
                            Uploading: {progress.current} / {progress.total}
                        </span>
                        <span className="ctm-progress-percentage">
                            {progress.percentage}%
                        </span>
                    </div>

                    <div className="ctm-progress-bar-bg">
                        <div
                            className="ctm-progress-bar-fill"
                            style={{ width: `${progress.percentage}%` }}
                        >
                            <div className="ctm-progress-shimmer"></div>
                        </div>
                    </div>

                    <p className="ctm-uploading-status">
                        {progress.current < progress.total
                            ? `Currently uploading movie ${progress.current}...`
                            : "Finalizing upload..."}
                    </p>
                </div>
            )}

            {showResults && (
                <div className="ctm-results-container">
                    <div className="ctm-result-card ctm-success-card">
                        <div className="ctm-result-header">
                            <span className="ctm-result-icon">✅</span>
                            <h3 className="ctm-result-title">Success</h3>
                        </div>
                        <p className="ctm-result-count">
                            {results.success.length} movies uploaded successfully
                        </p>

                        {results.success.length > 0 && (
                            <div className="ctm-result-list">
                                {results.success.slice(0, 5).map((movie) => (
                                    <div key={movie.id} className="ctm-result-item">
                                        <span className="ctm-item-icon">🎬</span>
                                        <span className="ctm-item-name">{movie.name}</span>
                                    </div>
                                ))}
                                {results.success.length > 5 && (
                                    <p className="ctm-more-items">
                                        +{results.success.length - 5} more...
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {results.failed.length > 0 && (
                        <div className="ctm-result-card ctm-failed-card">
                            <div className="ctm-result-header">
                                <span className="ctm-result-icon">❌</span>
                                <h3 className="ctm-result-title">Failed</h3>
                            </div>
                            <p className="ctm-result-count">
                                {results.failed.length} movies failed to upload
                            </p>

                            <div className="ctm-result-list">
                                {results.failed.map((movie) => (
                                    <div key={movie.id} className="ctm-result-item ctm-failed-item">
                                        <span className="ctm-item-icon">⚠️</span>
                                        <div className="ctm-failed-info">
                                            <span className="ctm-item-name">{movie.name}</span>
                                            <span className="ctm-error-msg">{movie.error}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={resetUpload}
                        className="ctm-reset-btn"
                    >
                        <span>🔄</span>
                        <span>Upload Again</span>
                    </button>
                </div>
            )}
        </div>
    );
}