import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Flag, Loader2, Plus, Users } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useT } from '../../lib/i18n';

const getScamTypes = (t) => ({
  overpricing: t('scam_type_overpricing'),
  fake_service: t('scam_type_fake_service'),
  quality_mismatch: t('scam_type_quality_mismatch'),
  hidden_charges: t('scam_type_hidden_charges'),
  other: t('scam_type_other'),
});

export default function ScamReportingPanel({ analysis, lang, onReportSuccess }) {
  const t = useT(lang);
  const SCAM_TYPES = getScamTypes(t);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingReports, setExistingReports] = useState([]);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    scam_type: 'overpricing',
    severity: 'medium',
    description: '',
  });

  useEffect(() => {
    loadExistingReports();
  }, []);

  const loadExistingReports = async () => {
    try {
      const reports = await base44.entities.ScamReport.filter({
        category: analysis?.category,
        location: analysis?.location,
        status: { $ne: 'rejected' }
      }, '-created_date', 5);
      setExistingReports(reports);
    } catch (err) {
      console.error('Error loading reports:', err);
    }
  };

  const handleSubmitReport = async () => {
    setIsSubmitting(true);
    try {
      const user = await base44.auth.me();
      
      await base44.entities.ScamReport.create({
        user_email: user.email,
        negotiation_id: analysis?.id || null,
        category: analysis?.category,
        location: analysis?.location,
        price_asked: analysis?.price_asked,
        price_estimated: analysis?.price_estimated_max,
        description: formData.description,
        scam_type: formData.scam_type,
        severity: formData.severity,
        confirmed_by: [user.email],
      });

      setFormData({ scam_type: 'overpricing', severity: 'medium', description: '' });
      setIsOpen(false);
      await loadExistingReports();
      onReportSuccess?.();
    } catch (err) {
      console.error('Error submitting report:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmReport = async (reportId) => {
    try {
      const user = await base44.auth.me();
      const report = existingReports.find(r => r.id === reportId);
      
      if (report && !report.confirmed_by?.includes(user.email)) {
        await base44.entities.ScamReport.update(reportId, {
          confirmations: (report.confirmations || 1) + 1,
          confirmed_by: [...(report.confirmed_by || []), user.email],
        });
        
        setUserConfirmed(true);
        await loadExistingReports();
      }
    } catch (err) {
      console.error('Error confirming report:', err);
    }
  };

  return (
    <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
            <Flag className="w-4 h-4" />
            {t('community_reports')}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{t('community_reports_desc')}</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          {t('report_btn')}
        </button>
      </div>

      {/* Existing Reports */}
      {existingReports.length > 0 && (
        <div className="pt-3 border-t border-red-500/20 space-y-2">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Users className="w-3 h-3" />
            {existingReports.reduce((acc, r) => acc + (r.confirmations || 1), 0)} signalements
          </p>
          {existingReports.map((report) => (
            <div key={report.id} className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <p className="text-xs font-semibold text-white">
                    {SCAM_TYPES[report.scam_type]}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{report.description}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  report.severity === 'high' ? 'bg-red-600/40 text-red-200' :
                  report.severity === 'medium' ? 'bg-yellow-600/40 text-yellow-200' :
                  'bg-orange-600/40 text-orange-200'
                }`}>
                  {report.severity === 'high' ? t('severity_high') : report.severity === 'medium' ? t('severity_medium') : t('severity_low')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {report.confirmations || 1} confirmation{(report.confirmations || 1) > 1 ? 's' : ''}
                </p>
                {!userConfirmed && !report.confirmed_by?.includes(base44.auth.me?.email) && (
                  <button
                    onClick={() => handleConfirmReport(report.id)}
                    className="px-2 py-1 bg-red-500/30 hover:bg-red-500/50 text-red-300 text-xs rounded transition-all"
                  >
                    {t('confirm_btn')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Form */}
      {isOpen && (
        <div className="pt-3 border-t border-red-500/20 space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">{t('scam_type_label')}</label>
            <select
              value={formData.scam_type}
              onChange={(e) => setFormData({ ...formData, scam_type: e.target.value })}
              className="w-full bg-shield-dark border border-red-500/30 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-red-400"
            >
              {Object.entries(SCAM_TYPES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">{t('severity_label')}</label>
            <select
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              className="w-full bg-shield-dark border border-red-500/30 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-red-400"
            >
              <option value="low">{t('severity_low')}</option>
              <option value="medium">{t('severity_medium')}</option>
              <option value="high">{t('severity_high')}</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">{t('description_label')}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('description_placeholder')}
              rows={3}
              className="w-full bg-shield-dark border border-red-500/30 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-red-400 resize-none placeholder-gray-600"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-3 py-2 bg-shield-border text-gray-300 text-xs font-semibold rounded-lg hover:bg-shield-border/80 transition-all"
            >
              {t('cancel_btn')}
            </button>
            <button
              onClick={handleSubmitReport}
              disabled={isSubmitting || !formData.description.trim()}
              className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {t('sending')}
                </>
              ) : (
                <>
                  <Flag className="w-3 h-3" />
                  {t('report_btn')}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}