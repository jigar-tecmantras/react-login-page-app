import { useState } from 'react';
import './App.css';

const initialValues = {
  email: '',
  password: '',
  remember: true
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [formValues, setFormValues] = useState(initialValues);
  const [status, setStatus] = useState(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailTrimmed = formValues.email.trim();
  const passwordTrimmed = formValues.password.trim();
  const emailFormatValid = emailTrimmed ? emailRegex.test(emailTrimmed) : false;
  const canSubmit = !!(emailTrimmed && passwordTrimmed && emailFormatValid);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (!canSubmit) {
      setStatus({
        type: 'error',
        text: 'Please enter a valid email address and password to continue.'
      });
      return;
    }

    const displayName = formValues.email.split('@')[0] || 'valued user';
    setStatus({
      type: 'success',
      text: `Welcome back, ${displayName}! You are signed in locally — no backend was required.`
    });
  };

  const emailError = touched.email
    ? !emailTrimmed
      ? 'Email is required.'
      : !emailFormatValid
      ? 'Enter a valid email address.'
      : ''
    : '';
  const passwordError = touched.password && !passwordTrimmed ? 'Password is required.' : '';

  return (
    <div className="app-wrapper">
      <main className="login-card" aria-live="polite">
        <div className="brand">
          <div className="brand-symbol" aria-hidden="true" />
          <div>
            <h1>Gravity</h1>
            <p>A calm login experience</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="hello@example.com"
              autoComplete="email"
              required
            />
            {emailError && <p className="input-error">{emailError}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            {passwordError && <p className="input-error">{passwordError}</p>}
          </div>

          <div className="options-row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={formValues.remember}
                onChange={handleChange}
              />
              Remember this device
            </label>
            <button type="button" className="text-button">
              Need help?
            </button>
          </div>

          <button type="submit" className="primary-button" disabled={!canSubmit}>
            {canSubmit ? 'Sign In' : 'Complete required fields'}
          </button>
        </form>

        {status && (
          <p className={`submit-message ${status.type}`} role="status">
            {status.text}
          </p>
        )}

        <p className="notes">
          This login mockup intentionally skips authentication logic — it is purely locally rendered.
        </p>
      </main>
    </div>
  );
}

export default App;
