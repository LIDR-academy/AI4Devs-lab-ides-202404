export const validateCandidateData = (data: any) => {
    if (!data.firstName || data.firstName.length < 2 || data.firstName.length > 50 || !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/.test(data.firstName)) {
        throw new Error('Invalid firstName');
    }

    if (!data.lastName || data.lastName.length < 2 || data.lastName.length > 50 || !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/.test(data.lastName)) {
        throw new Error('Invalid lastName');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email || !emailRegex.test(data.email)) {
        throw new Error('Invalid correo electrónico');
    }

    const phoneRegex = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
        throw new Error('Invalid teléfono');
    }

    if (data.address && data.address.length > 100) {
        throw new Error('Invalid dirección');
    }

    if (data.educations) {
        for (const education of data.educations) {
            console.log('Validating education:', education);
            if (!education.institution || education.institution.length > 100) {
                throw new Error('Invalid institution');
            }

            if (!education.title || education.title.length > 100) {
                throw new Error('Invalid título');
            }

            if (!education.startDate || !/^\d{4}-\d{2}-\d{2}$/.test(education.startDate)) {
                throw new Error('Invalid fecha de inicio');
            }

            if (education.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(education.endDate)) {
                throw new Error('Invalid fecha de finalización');
            }
        }
    }

    if (data.workExperiences) {
        for (const experience of data.workExperiences) {
            console.log('Validating work experience:', experience);
            if (!experience.company || experience.company.length > 100) {
                throw new Error('Invalid company');
            }

            if (!experience.position || experience.position.length > 100) {
                throw new Error('Invalid position');
            }

            if (experience.description && experience.description.length > 200) {
                throw new Error('Invalid descripción');
            }

            if (!experience.startDate || !/^\d{4}-\d{2}-\d{2}$/.test(experience.startDate)) {
                throw new Error('Invalid fecha de inicio');
            }

            if (experience.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(experience.endDate)) {
                throw new Error('Invalid fecha de finalización');
            }
        }
    }

    if (data.cv && !['application/pdf', 'application/msword'].includes(data.cv.mimetype)) {
        throw new Error('Invalid CV file type');
    }
};