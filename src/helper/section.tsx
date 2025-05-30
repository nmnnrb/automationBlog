// CollapsibleSection.jsx
import React, { useState, useEffect, useRef } from "react";
// import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
// import { Button } from "@/shared/components/ui/button";
// import { Textarea } from "@/shared/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Save,
  ThumbsUp,
  ThumbsDown,
  X,
  Loader2,
} from "lucide-react";


import RichTextEditor from "../helper/RichTextEditor"

/**
 * CollapsibleSection Component
 *
 * A collapsible section for SOAP notes with like/dislike and edit functionality
 */
interface CollapsibleSectionProps {
  section: {
    section_id: string;
    section_name: string;
    section_type: string;
    content: string;
    is_like?: boolean;
    is_dislike?: boolean;
  };
  isLiked?: boolean;
  isDisliked?: boolean;
  isLikeLoading?: boolean;
  isDislikeLoading?: boolean;
  onSectionUpdate?: (updatedSection: any) => void;
  className?: string;
}

const CollapsibleSection = React.forwardRef<
  HTMLTextAreaElement,
  CollapsibleSectionProps
>(
  (
    {
      section,
      isLiked = false,
      isDisliked = false,
      isLikeLoading = false,
      isDislikeLoading = false,
      onSectionUpdate,
      className,
    },
    ref
  ) => {
    // State management
    const [isExpanded, setIsExpanded] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(section.content);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Update edited content when section content changes
    useEffect(() => {
      setEditedContent(section.content);
    }, [section.content]);

    // Toggle section expansion
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    // Begin editing section
    const handleEdit = () => {
      setIsEditing(true);
      setEditedContent(section.content);
    };

    // Cancel editing and reset content
    const handleCancel = () => {
      setIsEditing(false);
      setEditedContent(section.content);
      setError(null);
    };

    // Handle like button click
    const handleLike = async (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering other events
      if (!isLikeLoading && !isDislikeLoading) {
        await reaction.like(section.section_id);
      }
    };

    // Handle dislike button click
    const handleDislike = async (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering other events
      if (!isLikeLoading && !isDislikeLoading) {
        await reaction.dislike(section.section_id);
      }
    };

    // Save edited content
    const handleSave = async () => {
      if (!editedContent.trim()) {
        setError("Content cannot be empty");
        return;
      }

      setIsSaving(true);
      setError(null);

      try {
        // Call the API to update the section
        await updateSection(section.section_id, {
          content: editedContent,
          section_type: section.section_type,
        });

        // Update the local state to reflect changes
        if (onSectionUpdate) {
          onSectionUpdate({
            ...section,
            content: editedContent,
          });
        }

        setIsEditing(false);
      } catch (err) {
        console.error("Failed to save section:", err);
        setError("Failed to save changes. Please try again.");
      } finally {
        setIsSaving(false);
      }
    };

    // Determine section styling based on section type
    const getSectionTypeStyles = () => {
      const typeMap: Record<
        string,
        { border: string; bg: string; text: string }
      > = {
        // Original mappings
        S: {
          border: "border-l-blue-500",
          bg: "bg-blue-50",
          text: "text-blue-800",
        },
        O: {
          border: "border-l-green-500",
          bg: "bg-green-50",
          text: "text-green-800",
        },
        A: {
          border: "border-l-amber-500",
          bg: "bg-amber-50",
          text: "text-amber-800",
        },
        P: {
          border: "border-l-purple-500",
          bg: "bg-purple-50",
          text: "text-purple-800",
        },

        // New comprehensive mappings
        administrative: {
          border: "border-l-slate-500",
          bg: "bg-slate-50",
          text: "text-slate-800",
        },
        allergies: {
          border: "border-l-red-500",
          bg: "bg-red-50",
          text: "text-red-800",
        },
        assessment: {
          border: "border-l-amber-500",
          bg: "bg-amber-50",
          text: "text-amber-800",
        }, // Same as "A"
        demographics: {
          border: "border-l-indigo-500",
          bg: "bg-indigo-50",
          text: "text-indigo-800",
        },
        diagnosis: {
          border: "border-l-rose-500",
          bg: "bg-rose-50",
          text: "text-rose-800",
        },
        diagnostic: {
          border: "border-l-teal-500",
          bg: "bg-teal-50",
          text: "text-teal-800",
        },
        diagnostics: {
          border: "border-l-teal-500",
          bg: "bg-teal-50",
          text: "text-teal-800",
        }, // Same as diagnostic
        documentation: {
          border: "border-l-gray-500",
          bg: "bg-gray-50",
          text: "text-gray-800",
        },
        exam: {
          border: "border-l-amber-500",
          bg: "bg-amber-50",
          text: "text-amber-800",
        }, // Kept from original
        "follow-up": {
          border: "border-l-sky-500",
          bg: "bg-sky-50",
          text: "text-sky-800",
        },
        formulation: {
          border: "border-l-emerald-500",
          bg: "bg-emerald-50",
          text: "text-emerald-800",
        },
        goals: {
          border: "border-l-lime-500",
          bg: "bg-lime-50",
          text: "text-lime-800",
        },
        history: {
          border: "border-l-blue-500",
          bg: "bg-blue-50",
          text: "text-blue-800",
        }, // Kept from original
        intervention: {
          border: "border-l-violet-500",
          bg: "bg-violet-50",
          text: "text-violet-800",
        },
        interventions: {
          border: "border-l-violet-500",
          bg: "bg-violet-50",
          text: "text-violet-800",
        }, // Same as intervention
        medication: {
          border: "border-l-green-500",
          bg: "bg-green-50",
          text: "text-green-800",
        }, // Kept from original
        medications: {
          border: "border-l-green-500",
          bg: "bg-green-50",
          text: "text-green-800",
        }, // Same as medication
        "mental status": {
          border: "border-l-fuchsia-500",
          bg: "bg-fuchsia-50",
          text: "text-fuchsia-800",
        },
        plan: {
          border: "border-l-purple-500",
          bg: "bg-purple-50",
          text: "text-purple-800",
        }, // Same as "P"
        procedure: {
          border: "border-l-cyan-500",
          bg: "bg-cyan-50",
          text: "text-cyan-800",
        },
        response: {
          border: "border-l-orange-500",
          bg: "bg-orange-50",
          text: "text-orange-800",
        },
        results: {
          border: "border-l-yellow-500",
          bg: "bg-yellow-50",
          text: "text-yellow-800",
        },
        status: {
          border: "border-l-pink-500",
          bg: "bg-pink-50",
          text: "text-pink-800",
        },
        symptoms: {
          border: "border-l-blue-400",
          bg: "bg-blue-50",
          text: "text-blue-800",
        },
        time: {
          border: "border-l-stone-500",
          bg: "bg-stone-50",
          text: "text-stone-800",
        },
        treatment: {
          border: "border-l-purple-500",
          bg: "bg-purple-50",
          text: "text-purple-800",
        }, // Kept from original
        "vital signs": {
          border: "border-l-red-400",
          bg: "bg-red-50",
          text: "text-red-800",
        },
      };

      // Default styling if type not found
      const defaultStyle = {
        border: "border-l-gray-500",
        bg: "bg-gray-50",
        text: "text-gray-800",
      };
      return typeMap[section.section_type] || defaultStyle;
    };

    const typeStyles = getSectionTypeStyles();

    return (
      <Card
        className={cn(
          "mb-4 overflow-hidden border-l-4",
          typeStyles.border,
          className
        )}
      >
        <CardHeader
          className={cn(
            "py-2 px-4 flex flex-row items-center justify-between",
            typeStyles.bg
          )}
        >
          <div
            className={cn(
              "flex items-center font-bold cursor-pointer",
              typeStyles.text
            )}
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <ChevronUp className={cn("h-4 w-4 mr-2", typeStyles.text)} />
            ) : (
              <ChevronDown className={cn("h-4 w-4 mr-2", typeStyles.text)} />
            )}
            <span>{section.section_name}</span>
          </div>

          <div className="flex items-center space-x-1">
            {/* Like/Dislike buttons */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-8 w-8",
                isLiked ? "bg-blue-100 text-blue-600" : "text-gray-500",
                isLikeLoading ? "opacity-70 cursor-not-allowed" : ""
              )}
              onClick={handleLike}
              disabled={isEditing || isLikeLoading || isDislikeLoading}
            >
              {isLikeLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUp className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-8 w-8",
                isDisliked ? "bg-red-100 text-red-600" : "text-gray-500",
                isDislikeLoading ? "opacity-70 cursor-not-allowed" : ""
              )}
              onClick={handleDislike}
              disabled={isEditing || isLikeLoading || isDislikeLoading}
            >
              {isDislikeLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ThumbsDown className="h-4 w-4" />
              )}
            </Button>

            {/* Edit/Save buttons */}
            {isEditing ?
             (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-8 text-blue-600 flex items-center"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs">Save</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-8 text-gray-600 flex items-center"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4 mr-1" />
                  <span className="text-xs">Cancel</span>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-8 text-gray-600 flex items-center"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-1" />
                <span className="text-xs">Edit</span>
              </Button>
            )}
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent
            className={cn("py-3 px-4", {
              "bg-white": !isEditing,
              "bg-gray-50": isEditing,
            })}
          >
{isEditing ? (
  <div className="space-y-2">
    <RichTextEditor content={editedContent} onChange={setEditedContent} />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
) : (
  <div
    className="prose max-w-none content-rendered"
    dangerouslySetInnerHTML={{ __html: section.content }}
  />
)}
        </CardContent>
        )}
      </Card>
    );
  }
);

export default CollapsibleSection;
