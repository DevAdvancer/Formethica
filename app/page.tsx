"use client";

import { useEffect, useState, useCallback } from "react";
import OptimizedImage from "@/components/optimized-image";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useAuthModal } from "@/lib/auth-modal-context";
import { useConfirmation } from "@/lib/confirmation-context";
import { useForms } from "@/lib/hooks/use-forms";
import FormCard from "@/components/form-card";

function WelcomePage() {
  const { openModal } = useAuthModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check URL parameters to auto-open auth modal
    const urlParams = new URLSearchParams(window.location.search);
    const authParam = urlParams.get("auth");

    if (authParam === "login") {
      openModal("sign_in");
      // Clean up URL
      window.history.replaceState({}, "", "/");
    } else if (authParam === "signup") {
      openModal("sign_up");
      // Clean up URL
      window.history.replaceState({}, "", "/");
    }
  }, [openModal, mounted]);

  return (
    <div className="page-content-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold solid-text-emerald mb-6 leading-tight">
              Forms Made
              <br />
              <span className="solid-text-orange">Beautiful</span>
            </h1>
            <p className="text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Create stunning forms with AI assistance, collect responses
              effortlessly, and manage your data with our modern glassmorphism
              interface
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button
              onClick={() => openModal("sign_up")}
              className="btn btn-primary text-xl px-12 py-5 glow-emerald">
              Start Creating Free
            </button>
            <button
              onClick={() => openModal("sign_in")}
              className="btn btn-secondary text-xl px-12 py-5">
              Sign In
            </button>
          </div>

          {/* Demo Preview */}
          <div className="card glow-emerald max-w-4xl mx-auto mb-20">
            <div className="aspect-video rounded-xl overflow-hidden">
              <video
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata">
                <source src="/demo.mp4" type="video/mp4" />
                {/* Fallback content for browsers that don't support video */}
                <div className="w-full h-full bg-gradient-to-br from-emerald-900/20 to-orange-900/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Interactive Demo
                    </h3>
                    <p className="text-white/70">
                      Your browser doesn't support video playback
                    </p>
                  </div>
                </div>
              </video>
            </div>

            {/* Video description below */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-1">
                Interactive Demo
              </h3>
              <p className="text-white/80 text-sm">
                See how easy it is to create forms with FORMETHICA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Why Choose FORMETHICA?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Powered by AI and designed for modern workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card glow-emerald text-center">
              <div className="text-emerald-400 mb-6">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                AI-Powered Form Builder
              </h3>
              <p className="text-white/70 text-lg">
                Get intelligent field suggestions based on your form title. Our
                AI chatbot helps you create better forms faster with smart
                recommendations.
              </p>
            </div>

            <div className="card glow-orange text-center">
              <div className="text-orange-400 mb-6">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Real-time Analytics
              </h3>
              <p className="text-white/70 text-lg">
                Track form submissions in real-time with beautiful analytics
                dashboard. Export responses to Excel or CSV with one click.
              </p>
            </div>

            <div className="card glow-amber text-center">
              <div className="text-amber-400 mb-6">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Easy Sharing
              </h3>
              <p className="text-white/70 text-lg">
                Share your forms instantly with automatically generated short
                URLs. Copy links with one click and start collecting responses
                immediately.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-4xl font-bold text-white mb-6">
                Complete Form Solution
              </h3>
              <ul className="space-y-4 text-lg text-white/80">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></span>
                  Multiple field types: text, email, number, select, radio,
                  checkbox, textarea
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-4"></span>
                  Drag and drop interface for easy form customization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-4"></span>
                  Real-time form validation and required field controls
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-4"></span>
                  Secure data collection with user authentication
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-4"></span>
                  Form activation/deactivation controls
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-4"></span>
                  Detailed submission tracking and management
                </li>
              </ul>
            </div>
            <div className="card glow-orange">
              <div className="aspect-square rounded-xl overflow-hidden">
                <OptimizedImage
                  src="/sampleForm.png"
                  alt="Form Builder Interface - FORMETHICA"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="solid-text-emerald">Simple</span> Pricing Plans
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Currently in public preview. All pricing plans coming soon!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Free Plan */}
            <div className="card glow-emerald">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    Coming Soon
                  </span>
                </div>
                <p className="text-white/70">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-white">Up to 3 form creations</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Unlimited submissions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">AI-powered suggestions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Export to Excel/CSV</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Basic analytics</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-700 text-white/60 py-3 px-6 rounded-lg cursor-not-allowed"
                disabled>
                Coming Soon
              </button>
            </div>

            {/* Pro Plan */}
            <div className="card glow-orange">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    Coming Soon
                  </span>
                </div>
                <p className="text-white/70">For power users</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-white">Up to 30 form creations</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Email notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Custom branding removal</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-700 text-white/60 py-3 px-6 rounded-lg cursor-not-allowed"
                disabled>
                Coming Soon
              </button>
            </div>

            {/* Max Plan */}
            <div className="card glow-amber">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Max</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    Coming Soon
                  </span>
                </div>
                <p className="text-white/70">
                  For teams & unlimited creativity
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-white">Up to 50 form creations</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">
                    Deletions don't affect limit
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Team collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">API access</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">Dedicated support</span>
                </li>
              </ul>

              <button
                className="w-full bg-gray-700 text-white/60 py-3 px-6 rounded-lg cursor-not-allowed"
                disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card glow-emerald">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of users who trust FORMETHICA for their data
              collection needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal("sign_up")}
                className="btn btn-primary text-xl px-10 py-4 glow-emerald">
                Create Your First Form
              </button>
              <button
                onClick={() => openModal("sign_in")}
                className="btn btn-secondary text-xl px-10 py-4">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardContent() {
  const { user, userProfile } = useAuth();
  const { confirm, showSuccess, showError } = useConfirmation();
  const {
    forms,
    loading,
    error,
    deleteForm: deleteFormHook,
    updateForm,
  } = useForms();
  const [mounted, setMounted] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalSubmissions: 0,
    activeForms: 0,
    recentActivity: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Username available via userProfile from auth context

  // Calculate dashboard statistics
  useEffect(() => {
    if (forms.length > 0) {
      const totalSubmissions = forms.reduce(
        (sum, form) => sum + (form.submission_count || 0),
        0
      );
      const activeForms = forms.filter((form) => form.is_active).length;
      const recentActivity = forms.filter((form) => {
        const dateString = form.updated_at || form.created_at;
        if (!dateString) return false;
        const updatedAt = new Date(dateString);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return updatedAt > weekAgo;
      }).length;

      setDashboardStats({
        totalSubmissions,
        activeForms,
        recentActivity,
      });
    }
  }, [forms]);

  // Show error if there's one from the hook
  useEffect(() => {
    if (error) {
      showError("Error", error);
    }
  }, [error, showError]);

  const copyToClipboard = useCallback(
    async (shortCode: string, event: React.MouseEvent) => {
      if (typeof window === "undefined") {
        return;
      }

      // Generate the full URL from the short code
      const fullUrl = `${window.location.origin}/s/${shortCode}`;

      try {
        // Try using the modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(fullUrl);
        } else {
          // Fallback for older browsers or non-HTTPS contexts
          const textArea = document.createElement("textarea");
          textArea.value = fullUrl;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          textArea.remove();
        }

        // Show success feedback with the actual URL
        showSuccess("Link Copied!", `Form link copied: ${fullUrl}`);

        // Also update the button temporarily
        const button = event.target as HTMLButtonElement;
        if (button) {
          const originalText = button.innerHTML;
          button.innerHTML = "✓ Copied!";
          setTimeout(() => {
            button.innerHTML = originalText;
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        showError(
          "Copy Failed",
          "Failed to copy the link. Please try again or copy manually from the URL field."
        );
      }
    },
    [showSuccess, showError]
  );

  const getShortUrl = useCallback((shortCode: string) => {
    if (typeof window === "undefined") {
      return `/s/${shortCode}`; // Fallback for SSR
    }
    return `${window.location.origin}/s/${shortCode}`;
  }, []);

  const handleDeleteForm = useCallback(
    async (id: string) => {
      console.log("🎯 Dashboard delete handler called for form:", id);
      const formToDelete = forms.find((f) => f.id === id);
      const formTitle = formToDelete?.title || "this form";

      console.log("📋 Form to delete:", formToDelete);

      confirm(
        "Delete Form",
        `Are you sure you want to delete "${formTitle}"? This action cannot be undone and will also delete all associated submissions and short URLs.`,
        async () => {
          console.log("✅ User confirmed deletion");
          try {
            console.log("🚀 Calling deleteFormHook...");
            const success = await deleteFormHook(id);
            console.log("📊 Delete result:", success);

            if (success) {
              console.log("🎉 Delete successful, showing success message");
              showSuccess(
                "Form Deleted",
                `"${formTitle}" has been successfully deleted along with all its data.`
              );
            } else {
              console.log("❌ Delete failed, showing error message");
              showError(
                "Delete Failed",
                "Failed to delete the form. Please try again."
              );
            }
          } catch (error) {
            console.error("💥 Delete error in dashboard handler:", error);
            showError(
              "Delete Failed",
              "An unexpected error occurred while deleting the form."
            );
          }
        }
      );
    },
    [confirm, showSuccess, showError, deleteFormHook, forms]
  );

  const handleToggleFormActive = useCallback(
    async (id: string, isActive: boolean) => {
      console.log("🔄 Toggling form active status:", id, "to", isActive);
      const formToToggle = forms.find((f) => f.id === id);
      const formTitle = formToToggle?.title || "this form";

      try {
        const success = await updateForm(id, { is_active: isActive });

        if (success) {
          showSuccess(
            `Form ${isActive ? "Activated" : "Deactivated"}`,
            `"${formTitle}" has been ${
              isActive ? "activated" : "deactivated"
            } successfully.`
          );
          console.log("✅ Form status updated successfully");
        } else {
          throw new Error("Update failed");
        }
      } catch (error) {
        console.error("💥 Error toggling form status:", error);
        showError(
          "Update Failed",
          `Failed to ${
            isActive ? "activate" : "deactivate"
          } the form. Please try again.`
        );
      }
    },
    [forms, updateForm, showSuccess, showError]
  );

  const getGreeting = () => {
    if (!mounted) return "Hello"; // Fallback for SSR
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMotivationalMessage = () => {
    if (forms.length === 0) {
      return "Ready to create your first form? Let's get started!";
    }
    if (forms.length < 3) {
      return "You're off to a great start! Keep building amazing forms.";
    }
    if (forms.length < 10) {
      return "Impressive form collection! You're becoming a pro.";
    }
    return "Wow! You're a form building expert with an amazing collection.";
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="spinner h-8 w-8 mx-auto mb-4"></div>
            <p className="text-white/60">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Early return if no user data is available
  if (!user) {
    return (
      <div className="page-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white/60">
              Unable to load user data. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary mt-4">
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {!mounted ? (
              "Welcome! "
            ) : (
              <span suppressHydrationWarning>
                {getGreeting()},{" "}
                {userProfile?.username ||
                  user?.user_metadata?.full_name ||
                  user?.user_metadata?.name ||
                  user?.email?.split("@")[0] ||
                  "there"}
                !
              </span>
            )}
          </h1>
          <p className="text-white/70 text-lg">{getMotivationalMessage()}</p>
        </div>

        {/* Dashboard Stats - Only show if user has forms */}
        {forms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card glow-emerald text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {forms.length}
              </div>
              <div className="text-white/70 text-sm">Total Forms</div>
            </div>
            <div className="card glow-orange text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {dashboardStats.activeForms}
              </div>
              <div className="text-white/70 text-sm">Active Forms</div>
            </div>
            <div className="card glow-amber text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">
                {dashboardStats.totalSubmissions}
              </div>
              <div className="text-white/70 text-sm">Total Submissions</div>
            </div>
            <div className="card glow-cyan text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {dashboardStats.recentActivity}
              </div>
              <div className="text-white/70 text-sm">Recent Activity</div>
            </div>
          </div>
        )}

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {forms.length === 0 ? "Get Started" : "Your Forms"}
            </h2>
            {forms.length > 0 && (
              <p className="text-white/60 mt-1">
                Manage your {forms.length} form{forms.length !== 1 ? "s" : ""}{" "}
                and track their performance
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <a href="/create" className="btn btn-primary glow-emerald">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Form
            </a>
            {forms.length > 0 && (
              <a href="/help" className="btn btn-secondary">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Help
              </a>
            )}
          </div>
        </div>

        {/* Forms Content */}
        {forms.length === 0 ? (
          <div className="text-center py-16">
            <div className="card max-w-2xl mx-auto glow-emerald">
              <div className="mb-8">
                <div className="w-24 h-24 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Create Your First Form
                </h3>
                <p className="text-white/70 mb-8 text-lg">
                  Start collecting responses with our AI-powered form builder.
                  It's easy, fast, and completely free to get started!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">AI-Powered</h4>
                  <p className="text-white/60 text-sm">
                    Get smart field suggestions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Lightning Fast
                  </h4>
                  <p className="text-white/60 text-sm">
                    Create forms in minutes
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Real-time Analytics
                  </h4>
                  <p className="text-white/60 text-sm">
                    Track responses instantly
                  </p>
                </div>
              </div>

              <a
                href="/create"
                className="btn btn-primary text-lg px-8 py-4 glow-emerald">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Your First Form
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Actions for existing users */}
            {forms.length >= 3 && (
              <div className="card glow-orange mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      🎉 You're doing great!
                    </h3>
                    <p className="text-white/70">
                      You have {forms.length} forms collecting valuable data.
                      {dashboardStats.totalSubmissions > 0 &&
                        ` You've received ${dashboardStats.totalSubmissions} submissions so far!`}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a href="/create" className="btn btn-primary">
                      Create Another
                    </a>
                    <a href="/help" className="btn btn-secondary">
                      Get Tips
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Forms Grid */}
            <div
              className={`grid gap-6 ${
                forms.length === 1
                  ? "md:grid-cols-1 max-w-md mx-auto"
                  : forms.length === 2
                  ? "md:grid-cols-2 max-w-4xl mx-auto"
                  : "md:grid-cols-2 lg:grid-cols-3"
              }`}>
              {forms.map((form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  mounted={mounted}
                  onCopyLink={copyToClipboard}
                  onDelete={handleDeleteForm}
                  onToggleActive={handleToggleFormActive}
                  getShortUrl={getShortUrl}
                />
              ))}
            </div>

            {/* Tips for users with few forms */}
            {forms.length < 5 && (
              <div className="mt-12 card glow-amber">
                <h3 className="text-lg font-semibold text-white mb-4">
                  💡 Pro Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Boost Response Rates
                    </h4>
                    <p className="text-white/70 text-sm">
                      Keep forms short and use clear, engaging questions to get
                      more responses.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Use AI Suggestions
                    </h4>
                    <p className="text-white/70 text-sm">
                      Let our AI help you create better forms with smart field
                      recommendations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Share Easily
                    </h4>
                    <p className="text-white/70 text-sm">
                      Use the short URLs to share your forms on social media and
                      emails.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Track Performance
                    </h4>
                    <p className="text-white/70 text-sm">
                      Monitor submissions and export data to analyze your
                      results.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timeout);
  }, []);

  // Show loading only during initial auth check, with timeout
  if (!mounted || (loading && !loadingTimeout)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // If loading timed out, show welcome page as fallback
  if (loadingTimeout && !user) {
    return <WelcomePage />;
  }

  if (!user) {
    return <WelcomePage />;
  }

  return <DashboardContent />;
}
