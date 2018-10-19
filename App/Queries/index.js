import {
  patientLogin,
  doctorLogin,
  preregisterPatient,
  patientRegister,
  doctorSMSLogin,
  doctorRegister,
  adminLogin,
  useRegisterCode
} from './login.queries'
import {
  getCanceledUpcomingAppointments,
  getUpcomingAppointments,
  getUnansweredUpcomingAppointments,
  getUnansweredByDestUpcomingAppointments,
  getPastAppointments,
  askAppointment,
  cancelAppointment,
  answerAppointment
} from './appointment.queries'
import {
  markMedicalEventAsSeen,
  getMyMedicalFile,
  getMedicalFile
} from './medical-file.queries'
import {
  getConsultationReports
} from './consultation-report.queries'
import {
  getMePatient,
  getMeDoctor,
  getRelatedDoctors,
  getRelatedPatients,
  setOneSignalId,
  removeOneSignalId,
  setDoctorActivity
} from './user.queries'
import {
  getOrdonnances
} from './ordonnance.queries'
import {
  validateDoctor
} from './admin.queries'
import {
  getAlerts
} from './alert.queries'

export default {
  patient: {
    auth: {
      login: patientLogin,
      register: patientRegister,
      useRegisterCode
    },
    appointment: {
      getCanceledUpcomingAppointments,
      getUpcomingAppointments,
      getUnansweredUpcomingAppointments,
      getUnansweredByDestUpcomingAppointments,
      getPastAppointments,
      askAppointment,
      cancelAppointment,
      answerAppointment
    },
    user: {
      getRelatedDoctors,
      getMe: getMePatient,
      getAlerts,
      setOneSignalId,
      removeOneSignalId
    },
    medicalFile: {
      markMedicalEventAsSeen,
      getMyMedicalFile
    }
  },
  doctor: {
    auth: {
      login: doctorLogin,
      smsLogin: doctorSMSLogin,
      register: doctorRegister
    },
    appointment: {
      getCanceledUpcomingAppointments,
      getUpcomingAppointments,
      getUnansweredUpcomingAppointments,
      getUnansweredByDestUpcomingAppointments,
      getPastAppointments,
      askAppointment,
      cancelAppointment,
      answerAppointment
    },
    user: {
      preregisterPatient,
      getMe: getMeDoctor,
      getRelatedPatients,
      getAlerts,
      setOneSignalId,
      removeOneSignalId,
      setDoctorActivity
    },
    medicalFile: {
      getMedicalFile
    }
  },
  admin: {
    auth: {
      login: adminLogin
    },
    actions: {
      validateDoctor
    }
  }
}