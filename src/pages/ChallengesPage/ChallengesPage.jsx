import { useState } from "react";
import imagePlaceholder from "../../assets/placeholders/imagePlaceholder.webp";
import styles from "./ChallengesPage.module.css";
import CurrentChallengeSection from "../../components/sections/challenges/CurrentChallengeSection/CurrentChallengeSection";
import ChallengeSubmissionForm from "../../components/sections/challenges/ChallengeSubmissionForm/ChallengeSubmissionForm";
import ChallengeSubmissionsSection from "../../components/sections/challenges/ChallengeSubmissionsSection/ChallengeSubmissionsSection";
import PastChallengesSection from "../../components/sections/challenges/PastChallengesSection/PastChallengesSection";
import {
  currentChallenge,
  initialSubmissions,
  pastChallenges,
} from "../../data/challenges";

const INITIAL_FORM_VALUES = {
  artworkTitle: "",
  artistName: "",
  artworkNote: "",
  artworkFileName: "",
};

const validateFormValues = (values) => {
  const errors = {};

  if (!values.artworkTitle.trim()) {
    errors.artworkTitle = "Please enter your artwork title.";
  }

  if (!values.artistName.trim()) {
    errors.artistName = "Please enter your name.";
  }

  return errors;
};

const ChallengesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const resetFormState = () => {
    setFormValues(INITIAL_FORM_VALUES);
    setFormErrors({});
    setImagePreview("");
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    resetFormState();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      artworkFileName: selectedFile ? selectedFile.name : "",
    }));

    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(typeof reader.result === "string" ? reader.result : "");
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateFormValues(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    const trimmedArtworkTitle = formValues.artworkTitle.trim();
    const trimmedArtistName = formValues.artistName.trim();
    const trimmedArtworkNote = formValues.artworkNote.trim();

    setSubmissions((prevSubmissions) => {
      const nextId =
        prevSubmissions.length > 0
          ? Math.max(...prevSubmissions.map((submission) => submission.id)) + 1
          : 1;

      const newSubmission = {
        id: nextId,
        artistName: trimmedArtistName,
        artworkTitle: trimmedArtworkTitle,
        image: imagePreview || imagePlaceholder,
        imageAlt: imagePreview
          ? `${trimmedArtworkTitle} uploaded preview`
          : `${trimmedArtworkTitle} submission placeholder image`,
        medium: formValues.artworkFileName || "Uploaded artwork",
        note: trimmedArtworkNote,
      };

      return [newSubmission, ...prevSubmissions];
    });

    resetFormState();
    setIsFormOpen(false);
  };

  return (
    <div className={styles.page}>
      <CurrentChallengeSection
        title={currentChallenge.title}
        theme={currentChallenge.theme}
        description={currentChallenge.description}
        deadline={currentChallenge.deadline}
        format={currentChallenge.format}
        prize={currentChallenge.prize}
        image={currentChallenge.image}
        imageAlt={currentChallenge.imageAlt}
        onParticipate={handleOpenForm}
      />
      {isFormOpen && (
        <ChallengeSubmissionForm
          values={formValues}
          errors={formErrors}
          previewImage={imagePreview}
          onChange={handleFormChange}
          onFileChange={handleFileChange}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
      <ChallengeSubmissionsSection submissions={submissions} />
      <PastChallengesSection challenges={pastChallenges} />
    </div>
  );
};

export default ChallengesPage;
