CREATE DATABASE IF NOT EXISTS bloom CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bloom;

CREATE TABLE IF NOT EXISTS journal_entries (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(64) NOT NULL,
    content TEXT NOT NULL,
    mood VARCHAR(32) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_user_created (user_id, created_at)
);

CREATE TABLE IF NOT EXISTS journal_analyses (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    entry_id BIGINT UNSIGNED NOT NULL,
    sentiment VARCHAR(16) NOT NULL,
    emotions JSON NULL,
    keywords JSON NULL,
    risk_flags JSON NULL,
    suggestions TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_entry FOREIGN KEY (entry_id) REFERENCES journal_entries(id)
);