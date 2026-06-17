"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Wifi,
  ShieldCheck,
  Zap,
  Users,
  Contact,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "signup";
  onSuccess?: (name: string) => void;
}

export function AuthModal({ isOpen, onClose, initialTab = "login", onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
  const [signupStep, setSignupStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  // Sync state with isOpen prop for fade out transition
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300); // match 300ms CSS transition
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // OTP inputs references
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      resetForm();
    }
  }, [initialTab, isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setSignupEmail("");
    setOtp(Array(6).fill(""));
    setSignupPassword("");
    setConfirmPassword("");
    setErrors({});
    setSignupStep(1);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSuccessMessage(null);
  };

  const validateEmail = (val: string) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  // Step 1: Signup validation (Names and Email)
  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!signupEmail.trim()) {
      newErrors.signupEmail = "Email is required";
    } else if (!validateEmail(signupEmail)) {
      newErrors.signupEmail = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate sending OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setSignupStep(2);
      // Auto focus first OTP input after DOM updates
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 50);
    }, 1200);
  };

  // Step 2: OTP inputs handlers
  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit numbers
    const cleanValue = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (cleanValue && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace back-focus
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);

    if (pastedData.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        if (pastedData[i]) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);
      // Focus on the next empty spot or the last spot
      const focusIndex = Math.min(pastedData.length, 5);
      otpRefs.current[focusIndex]?.focus();
    }
  };

  const handleSignupStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 6) {
      setErrors({ otp: "Please enter the full 6-digit OTP code" });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsSubmitting(false);
      setSignupStep(3);
    }, 1000);
  };

  // Step 3: Password validation & Signup completion
  const handleSignupStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!signupPassword) {
      newErrors.signupPassword = "Password is required";
    } else if (signupPassword.length < 6) {
      newErrors.signupPassword = "Password must be at least 6 characters";
    }

    if (signupPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate registration
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Account created successfully! Tap to start networking.");
      const displayName = firstName || signupEmail.split("@")[0];
      onSuccess?.(displayName);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    }, 1500);
  };

  // Login Validation & Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate login
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Welcome back! Loading your profile...");
      // Derive display name from email (part before @)
      const displayName = email.split("@")[0];
      onSuccess?.(displayName);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    }, 1500);
  };

  if (!shouldRender) return null;

  return (
    <div className={`auth-overlay ${isClosing ? "closing" : ""}`} onClick={onClose}>
      {/* Background Image & Readable Blur Tint */}
      <div className="auth-bg-image" aria-hidden="true" />
      <div className="auth-bg-overlay-tint" aria-hidden="true" />

      <div className="auth-container">
        <div
          className={`auth-modal ${isClosing ? "closing" : ""}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle decorative glows inside modal */}
          <div className="auth-glow auth-glow-1" aria-hidden="true" />
          <div className="auth-glow auth-glow-2" aria-hidden="true" />

          {/* Close Button */}
          <button
            className="auth-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            suppressHydrationWarning
          >
            <X className="icon" />
          </button>

          {/* Modal Branding Header */}
          <div className="auth-header">
            <div className="logo-mark auth-logo-mark">
              <Contact className="icon" aria-hidden="true" />
            </div>
            <h2 className="auth-brand-title">HappyTap</h2>
            <p className="auth-brand-subtitle">
              {activeTab === "login"
                ? "Sign in to manage your digital card"
                : "Create your high-fidelity networking profile"}
            </p>
          </div>

          {/* Success State Overlay */}
          {successMessage && (
            <div className="auth-success-state">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} className="success-icon" />
              </div>
              <h3>Success!</h3>
              <p>{successMessage}</p>
              <div className="loader-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {/* Tabs - Only show if not displaying success page */}
          {!successMessage && (
            <>
              <div className="auth-tabs">
                <div
                  className="auth-tab-indicator"
                  style={{
                    transform: `translateX(${activeTab === "login" ? "0%" : "100%"})`
                  }}
                />
                <button
                  className={`auth-tab-btn ${activeTab === "login" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("login");
                    setErrors({});
                  }}
                  suppressHydrationWarning
                >
                  Login
                </button>
                <button
                  className={`auth-tab-btn ${activeTab === "signup" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("signup");
                    setErrors({});
                  }}
                  suppressHydrationWarning
                >
                  Sign Up
                </button>
              </div>

              <div className="auth-body">
                {/* LOGIN FORM */}
                {activeTab === "login" && (
                  <form onSubmit={handleLogin} className="auth-form animate-slide-in">
                    <div className="input-group">
                      <label htmlFor="login-email">Email Address</label>
                      <div className={`input-wrapper ${errors.email ? "has-error" : ""}`}>
                        <Mail className="input-icon" size={18} />
                        <input
                          type="email"
                          id="login-email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isSubmitting}
                          className="input-field"
                          suppressHydrationWarning
                        />
                      </div>
                      {errors.email && (
                        <span className="error-message">
                          <AlertCircle size={12} className="error-icon" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="input-group">
                      <div className="label-row">
                        <label htmlFor="login-password">Password</label>
                        <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                          Forgot Password?
                        </a>
                      </div>
                      <div className={`input-wrapper ${errors.password ? "has-error" : ""}`}>
                        <Lock className="input-icon" size={18} />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="login-password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isSubmitting}
                          className="input-field"
                          suppressHydrationWarning
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          suppressHydrationWarning
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && (
                        <span className="error-message">
                          <AlertCircle size={12} className="error-icon" />
                          {errors.password}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-auth btn-primary-glow"
                      disabled={isSubmitting}
                      suppressHydrationWarning
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="spinner" size={18} />
                          Logging in...
                        </>
                      ) : (
                        <>
                          Login
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <div className="divider">
                      <span>OR</span>
                    </div>

                    <button
                      type="button"
                      className="btn-google"
                      onClick={(e) => e.preventDefault()}
                      disabled={isSubmitting}
                      suppressHydrationWarning
                    >
                      <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </button>

                    <p className="auth-terms-text">
                      By continuing, you agree to our <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>.
                    </p>
                  </form>
                )}

                {/* SIGNUP FORM */}
                {activeTab === "signup" && (
                  <div className="signup-wizard">
                    {/* Steps Progress Header */}
                    <div className="signup-steps-progress">
                      <div className={`step-dot ${signupStep >= 1 ? "active" : ""} ${signupStep > 1 ? "completed" : ""}`}>
                        <span>1</span>
                        <span className="step-label">Details</span>
                      </div>
                      <div className="step-line-progress">
                        <div className="line-fill" style={{ width: signupStep === 1 ? "0%" : signupStep === 2 ? "50%" : "100%" }} />
                      </div>
                      <div className={`step-dot ${signupStep >= 2 ? "active" : ""} ${signupStep > 2 ? "completed" : ""}`}>
                        <span>2</span>
                        <span className="step-label">OTP</span>
                      </div>
                      <div className="step-line-progress">
                        <div className="line-fill" style={{ width: signupStep <= 2 ? "0%" : "100%" }} />
                      </div>
                      <div className={`step-dot ${signupStep >= 3 ? "active" : ""}`}>
                        <span>3</span>
                        <span className="step-label">Security</span>
                      </div>
                    </div>

                    {/* STEP 1: Basic Info */}
                    {signupStep === 1 && (
                      <form onSubmit={handleSignupStep1} className="auth-form animate-slide-in">
                        <div className="name-row">
                          <div className="input-group">
                            <div className={`input-wrapper ${errors.firstName ? "has-error" : ""}`}>
                              <User className="input-icon" size={18} />
                              <input
                                type="text"
                                id="signup-firstname"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={isSubmitting}
                                className="input-field"
                                suppressHydrationWarning
                              />
                            </div>
                            {errors.firstName && (
                              <span className="error-message">
                                <AlertCircle size={12} className="error-icon" />
                                {errors.firstName}
                              </span>
                            )}
                          </div>

                          <div className="input-group">
                            <div className={`input-wrapper ${errors.lastName ? "has-error" : ""}`}>
                              <User className="input-icon" size={18} />
                              <input
                                type="text"
                                id="signup-lastname"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={isSubmitting}
                                className="input-field"
                                suppressHydrationWarning
                              />
                            </div>
                            {errors.lastName && (
                              <span className="error-message">
                                <AlertCircle size={12} className="error-icon" />
                                {errors.lastName}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="input-group">
                          <div className={`input-wrapper ${errors.signupEmail ? "has-error" : ""}`}>
                            <Mail className="input-icon" size={18} />
                            <input
                              type="email"
                              id="signup-email"
                              placeholder="Email Address"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              disabled={isSubmitting}
                              className="input-field"
                              suppressHydrationWarning
                            />
                          </div>
                          {errors.signupEmail && (
                            <span className="error-message">
                              <AlertCircle size={12} className="error-icon" />
                              {errors.signupEmail}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn-auth btn-primary-glow"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="spinner" size={18} />
                              Sending OTP...
                            </>
                          ) : (
                            <>
                              Send OTP Code
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    {/* STEP 2: OTP Verification */}
                    {signupStep === 2 && (
                      <form onSubmit={handleSignupStep2} className="auth-form animate-slide-in">
                        <div className="input-group align-center">
                          <label>Verification Code</label>
                          <p className="input-desc">
                            We've sent a 6-digit OTP code to <strong className="text-purple-highlight">{signupEmail}</strong>.
                          </p>

                          <div className="otp-container">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                type="text"
                                maxLength={1}
                                pattern="[0-9]*"
                                inputMode="numeric"
                                value={digit}
                                ref={(el) => {
                                  otpRefs.current[index] = el;
                                }}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                onPaste={index === 0 ? handleOtpPaste : undefined}
                                disabled={isSubmitting}
                                className={`otp-input ${errors.otp ? "has-error" : ""}`}
                                autoFocus={index === 0}
                                suppressHydrationWarning
                              />
                            ))}
                          </div>

                          {errors.otp && (
                            <span className="error-message align-center">
                              <AlertCircle size={12} className="error-icon" />
                              {errors.otp}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn-auth btn-primary-glow"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="spinner" size={18} />
                              Verifying...
                            </>
                          ) : (
                            <>
                              Verify OTP Code
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>

                        <div className="step-back-row">
                          <button
                            type="button"
                            className="btn-back-link"
                            onClick={() => {
                              setSignupStep(1);
                              setErrors({});
                            }}
                            disabled={isSubmitting}
                            suppressHydrationWarning
                          >
                            Change Email Address
                          </button>
                        </div>
                      </form>
                    )}

                    {/* STEP 3: Setup Password */}
                    {signupStep === 3 && (
                      <form onSubmit={handleSignupStep3} className="auth-form animate-slide-in">
                        <div className="input-group">
                          <div className={`input-wrapper ${errors.signupPassword ? "has-error" : ""}`}>
                            <Lock className="input-icon" size={18} />
                            <input
                              type={showPassword ? "text" : "password"}
                              id="signup-password"
                              placeholder="Password"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              disabled={isSubmitting}
                              className="input-field"
                              suppressHydrationWarning
                            />
                            <button
                              type="button"
                              className="password-toggle"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              suppressHydrationWarning
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          {errors.signupPassword && (
                            <span className="error-message">
                              <AlertCircle size={12} className="error-icon" />
                              {errors.signupPassword}
                            </span>
                          )}
                        </div>

                        <div className="input-group">
                          <div className={`input-wrapper ${errors.confirmPassword ? "has-error" : ""}`}>
                            <Lock className="input-icon" size={18} />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="signup-confirm-password"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              disabled={isSubmitting}
                              className="input-field"
                              suppressHydrationWarning
                            />
                            <button
                              type="button"
                              className="password-toggle"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                              suppressHydrationWarning
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <span className="error-message">
                              <AlertCircle size={12} className="error-icon" />
                              {errors.confirmPassword}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn-auth btn-primary-glow"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="spinner" size={18} />
                              Creating Account...
                            </>
                          ) : (
                            <>
                              Create Account
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Bottom Feature Badges */}
        {!successMessage && (
          <div className="auth-features-bar">
            <div className="auth-feature-item">
              <ShieldCheck className="feature-icon" aria-hidden="true" />
              <div className="feature-text">
                <strong>Secure & Private</strong>
                <span>Your data is protected</span>
              </div>
            </div>
            <div className="feature-divider" aria-hidden="true" />
            <div className="auth-feature-item">
              <Zap className="feature-icon" aria-hidden="true" />
              <div className="feature-text">
                <strong>Instant Sharing</strong>
                <span>Tap to connect instantly</span>
              </div>
            </div>
            <div className="feature-divider" aria-hidden="true" />
            <div className="auth-feature-item">
              <Users className="feature-icon" aria-hidden="true" />
              <div className="feature-text">
                <strong>Trusted by 40K+</strong>
                <span>Professionals worldwide</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
