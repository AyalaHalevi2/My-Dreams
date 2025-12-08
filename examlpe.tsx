import React, { useState, useRef, useEffect } from 'react';
import styles from './dreamsList.module.scss';

const MOODS = ['happy', 'sad', 'scared', 'confused', 'peaceful', 'anxious', 'excited', 'neutral'];
const CLARITY_LEVELS = [1, 2, 3, 4, 5];

// Sample dream data
const SAMPLE_DREAMS = [
  { id: 1, title: "Flying Over Mountains", date: "2024-11-25", mood: "excited", clarity: 5, content: "I was soaring through clouds, feeling completely free. The mountains below were covered in snow..." },
  { id: 2, title: "Lost in Forest", date: "2024-11-28", mood: "anxious", clarity: 3, content: "Trees everywhere, couldn't find my way out. Kept hearing strange sounds..." },
  { id: 3, title: "Beach Sunset", date: "2024-12-01", mood: "peaceful", clarity: 4, content: "Waves crashing gently, warm sand beneath my feet. The sky was painted in oranges and pinks..." },
  { id: 4, title: "Alien Encounter", date: "2024-11-20", mood: "scared", clarity: 2, content: "Strange lights in the sky, feeling of being watched. Everything felt surreal..." },
  { id: 5, title: "Old Friends Reunion", date: "2024-11-30", mood: "happy", clarity: 5, content: "Met my childhood friends at our old hangout spot. We laughed about old memories..." },
  { id: 6, title: "Underwater Adventure", date: "2024-11-22", mood: "excited", clarity: 4, content: "Swimming with dolphins, breathing underwater naturally. Everything was so vivid..." },
];

// Dream Card Component
function DreamCard({ dream }) {
  return (
    <div className={styles.dreamCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.dreamTitle}>{dream.title}</h3>
        <button className={styles.favoriteBtn}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
      </div>

      <p className={styles.dreamContent}>{dream.content}</p>

      <div className={styles.dreamMeta}>
        <span className={styles.dreamDate}>{dream.date}</span>
        <span className={styles.moodBadge}>
          {dream.mood}
        </span>
        <div className={styles.clarityRating}>
          <span className={styles.clarityLabel}>Clarity:</span>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill={i < dream.clarity ? "currentColor" : "none"}
                className={i < dream.clarity ? styles.starFilled : styles.starEmpty}
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DreamList() {
  const [dreams] = useState(SAMPLE_DREAMS);
  const [sortOpen, setSortOpen] = useState(false);

  // Filter states
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);

  // Sort state
  const [sortBy, setSortBy] = useState('date-newest');

  const sortRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sorting function
  const getSortedDreams = (dreamsToSort) => {
    const sorted = [...dreamsToSort];
    switch (sortBy) {
      case 'date-newest':
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'date-oldest':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'title-az':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-za':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  // Filtering function
  const getFilteredDreams = () => {
    let filtered = dreams;

    if (selectedMoods.length > 0) {
      filtered = filtered.filter(dream => selectedMoods.includes(dream.mood));
    }

    if (selectedClarity.length > 0) {
      filtered = filtered.filter(dream => selectedClarity.includes(dream.clarity));
    }

    return filtered;
  };

  // Combined sorting and filtering
  const displayedDreams = getSortedDreams(getFilteredDreams());

  // Sort option handler
  const handleSortChange = (option) => {
    setSortBy(option);
    setSortOpen(false);
  };

  // Mood filter toggle
  const toggleMood = (mood) => {
    setSelectedMoods(prev =>
      prev.includes(mood)
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  // Clarity filter toggle
  const toggleClarity = (level) => {
    setSelectedClarity(prev =>
      prev.includes(level)
        ? prev.filter(c => c !== level)
        : [...prev, level]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMoods([]);
    setSelectedClarity([]);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'date-newest': return 'Date (Newest)';
      case 'date-oldest': return 'Date (Oldest)';
      case 'title-az': return 'Title (A-Z)';
      case 'title-za': return 'Title (Z-A)';
      default: return 'Recommend';
    }
  };

  const activeFilterCount = selectedMoods.length + selectedClarity.length;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          {/* Sidebar Filter */}
          <aside className={styles.sidebar}>
            <div className={styles.filterPanel}>
              <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>Filter</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className={styles.clearBtn}>
                    Clear All
                  </button>
                )}
              </div>

              {/* Mood Section */}
              <div className={styles.filterSection}>
                <button className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Mood</h4>
                  <span className={styles.collapseIcon}>−</span>
                </button>
                <div className={styles.filterOptions}>
                  {MOODS.map(mood => (
                    <label key={mood} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedMoods.includes(mood)}
                        onChange={() => toggleMood(mood)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>{mood}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clarity Section */}
              <div className={styles.filterSection}>
                <button className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Clarity</h4>
                  <span className={styles.collapseIcon}>−</span>
                </button>
                <div className={styles.filterOptions}>
                  {CLARITY_LEVELS.map(level => (
                    <label key={level} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedClarity.includes(level)}
                        onChange={() => toggleClarity(level)}
                        className={styles.checkbox}
                      />
                      <div className={styles.clarityOption}>
                        <span className={styles.checkboxText}>{level}</span>
                        <div className={styles.stars}>
                          {[...Array(level)].map((_, i) => (
                            <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className={styles.starIcon}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Header with Sort */}
            <div className={styles.contentHeader}>
              <div className={styles.headerInfo}>
                <h2 className={styles.pageTitle}>Dreams List</h2>
                <p className={styles.resultsCount}>{displayedDreams.length} dreams found</p>
              </div>

              {/* Sort Dropdown */}
              <div className={styles.sortWrapper} ref={sortRef}>
                <button className={styles.sortButton} onClick={() => setSortOpen(!sortOpen)}>
                  <span className={styles.sortLabel}>Sort By</span>
                  <span className={styles.sortValue}>{getSortLabel()}</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className={`${styles.sortArrow} ${sortOpen ? styles.sortArrowOpen : ''}`}>
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>

                {sortOpen && (
                  <div className={styles.sortDropdown}>
                    {[
                      { value: 'date-newest', label: 'Date (Newest)' },
                      { value: 'date-oldest', label: 'Date (Oldest)' },
                      { value: 'title-az', label: 'Title (A-Z)' },
                      { value: 'title-za', label: 'Title (Z-A)' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        className={`${styles.sortOption} ${sortBy === option.value ? styles.sortOptionActive : ''}`}
                        onClick={() => handleSortChange(option.value)}
                      >
                        {option.label}
                        {sortBy === option.value && (
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className={styles.checkIcon}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dreams Grid */}
            <div className={styles.dreamsGrid}>
              {displayedDreams.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <svg className={styles.emptyIconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className={styles.emptyText}>No dreams match your filters</p>
                  <button onClick={clearFilters} className={styles.emptyClearBtn}>
                    Clear filters
                  </button>
                </div>
              ) : (
                displayedDreams.map((dream) => (
                  <DreamCard key={dream.id} dream={dream} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import './AddDream.module.scss';

// Mock style object since we can't import actual SCSS modules
const style = {
  addDreamForm: 'addDreamForm',
  formGroup: 'formGroup',
  label: 'label',
  input: 'input',
  textarea: 'textarea',
  slider: 'slider',
  sliderValue: 'sliderValue',
  moodSelector: 'moodSelector',
  moodButton: 'moodButton',
  moodButtonActive: 'moodButtonActive',
  tagsInput: 'tagsInput',
  tagsList: 'tagsList',
  tag: 'tag',
  checkbox: 'checkbox',
  checkboxLabel: 'checkboxLabel',
  submitButton: 'submitButton',
  title: 'title'
};

const AddDreamForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    clarity: 5,
    mood: undefined,
    tags: [],
    isFavorite: false
  });

  const [tagInput, setTagInput] = useState('');

  const moods = ['happy', 'sad', 'scared', 'confused', 'peaceful', 'anxious', 'excited', 'neutral'];

  const handleSubmit = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    const dream = {
      id: Date.now().toString(),
      userId: 'user-1',
      ...formData,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log('Dream submitted:', dream);
    alert('Dream added successfully! Check console for details.');
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className={style.addDreamForm}>
      <h2 className={style.title}>✨ Add New Dream</h2>

      <div>
        <div className={style.formGroup}>
          <label className={style.label}>Dream Title</label>
          <input
            type="text"
            className={style.input}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter a title for your dream..."
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>Dream Content</label>
          <textarea
            className={style.textarea}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Describe your dream in detail..."
            rows={6}
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>
            Clarity Level: <span className={style.sliderValue}>{formData.clarity}/10</span>
          </label>
          <input
            type="range"
            className={style.slider}
            min="1"
            max="10"
            value={formData.clarity}
            onChange={(e) => setFormData({ ...formData, clarity: parseInt(e.target.value) })}
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>Mood</label>
          <div className={style.moodSelector}>
            {moods.map((mood) => (
              <button
                key={mood}
                type="button"
                className={`${style.moodButton} ${formData.mood === mood ? style.moodButtonActive : ''}`}
                onClick={() => setFormData({ ...formData, mood: formData.mood === mood ? undefined : mood })}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>Tags</label>
          <input
            type="text"
            className={style.tagsInput}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type a tag and press Enter..."
          />
          {formData.tags.length > 0 && (
            <div className={style.tagsList}>
              {formData.tags.map((tag) => (
                <span key={tag} className={style.tag}>
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={style.formGroup}>
          <label className={style.checkboxLabel}>
            <input
              type="checkbox"
              className={style.checkbox}
              checked={formData.isFavorite}
              onChange={(e) => setFormData({ ...formData, isFavorite: e.target.checked })}
            />
            Mark as Favorite ⭐
          </label>
        </div>

        <button onClick={handleSubmit} className={style.submitButton}>
          Add Dream
        </button>
      </div>

      <style jsx>{`
        .addDreamForm {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: var(--bg-card);
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
        }

        .title {
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.8rem;
        }

        .formGroup {
          margin-bottom: 1.5rem;
        }

        .label {
          display: block;
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .input,
        .textarea,
        .tagsInput {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .input:focus,
        .textarea:focus,
        .tagsInput:focus {
          outline: none;
          border-color: var(--border-hover);
          box-shadow: 0 0 10px var(--star-shimmer);
        }

        .textarea {
          resize: vertical;
          font-family: inherit;
        }

        .slider {
          width: 100%;
          height: 6px;
          border-radius: 5px;
          background: var(--border-color);
          outline: none;
          -webkit-appearance: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--star-glow);
          cursor: pointer;
          box-shadow: 0 0 10px var(--star-shimmer);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--star-glow);
          cursor: pointer;
          box-shadow: 0 0 10px var(--star-shimmer);
          border: none;
        }

        .sliderValue {
          color: var(--star-glow);
          font-weight: bold;
          margin-left: 0.5rem;
        }

        .moodSelector {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .moodButton {
          padding: 0.5rem 1rem;
          border: 2px solid var(--border-color);
          border-radius: 20px;
          background: var(--bg-card);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          text-transform: capitalize;
        }

        .moodButton:hover {
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        .moodButtonActive {
          background: var(--star-glow);
          color: var(--text-on-secondary);
          border-color: var(--star-glow);
          box-shadow: 0 0 15px var(--star-shimmer);
        }

        .tagsList {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          background: var(--primary-color);
          color: var(--text-on-primary);
          border-radius: 15px;
          font-size: 0.85rem;
        }

        .tag button {
          background: none;
          border: none;
          color: var(--text-on-primary);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .tag button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .checkboxLabel {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
          cursor: pointer;
          font-size: 1rem;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: var(--star-glow);
        }

        .submitButton {
          width: 100%;
          padding: 1rem;
          background: var(--star-glow);
          color: var(--text-on-secondary);
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px var(--star-shimmer);
        }

        .submitButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px var(--star-shimmer);
        }

        .submitButton:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default AddDreamForm;



//loginPrivude - context

import React, { createContext, useEffect, useState } from "react"

import { PATH } from "../Types"

const LoginContext = createContext({
    isLoggedIn: true,
    handleLogin: () => { },
    handleLogout: () => { }
})

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is authenticated via cookie


    const handleLogin = () => {
        console.log('logged in successfully');
        setLoggedIn(true);
        navigate('/');
    };

    const handleLogout = async () => {
        try {
            await fetch(`${PATH}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            console.log('logged out successfully');
            setLoggedIn(false);
            navigate('/login');
        }
    };

    // Check auth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoading && !isLoggedIn && location.pathname !== "/register" && location.pathname !== "/login") {
            navigate("/login");
        }
    }, [isLoggedIn, location.pathname, navigate, isLoading]);
    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </LoginContext.Provider>
    )
}
export { LoginContext, LoginProvider }
//change to login provider


//openAddDreamFormProvider - context
import { createContext, useState } from "react"

const AddFormContext = createContext({
toggleAddDreamForm: false,
    handleToggleAddDreamForm: () => { }
})

const AddDreamFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [ toggleAddDreamForm,setToggleAddDreamForm ] = useState(false);
    const handleToggleAddDreamForm = () => { setToggleAddDreamForm(!toggleAddDreamForm) };
    return (
        <AddFormContext.Provider value={{ toggleAddDreamForm, handleToggleAddDreamForm }}>
            {children}
        </AddFormContext.Provider>
    )
}

export { AddFormContext, AddDreamFormProvider }


//themeProvider - context
import { createContext, useEffect, useState } from "react"

const ThemeContext = createContext({
    theme: "dark" as 'light' | 'dark',
    handleToggleTheme: () => { }
})
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "light";
    });
    const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    console.log("theme", theme);

    }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export { ThemeProvider, ThemeContext };

