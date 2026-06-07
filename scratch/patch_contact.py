import os

filepath = r"src\app\contact\page.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix partner_application
content = content.replace("{form.leadType === 'partner_application' && (", "{(form.leadType === 'partner_application' || form.leadType === 'partner') && (")

# Insert new conditional blocks
new_blocks = """
      {form.leadType === 'audit' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Building Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Audit Type</label>
              <select className={styles.inputField} value={form.formData.auditType || ''} onChange={e => handleExtraFieldChange('auditType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Residential">Residential Building</option>
                <option value="Commercial">Commercial Building</option>
                <option value="Industrial">Industrial</option>
                <option value="Old Building">Old Building / Heritage</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'survey' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Property Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., OMR" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Survey Type</label>
              <select className={styles.inputField} value={form.formData.surveyType || ''} onChange={e => handleExtraFieldChange('surveyType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Land/Boundary">Land / Boundary Survey</option>
                <option value="Contour">Contour Survey</option>
                <option value="Topographic">Topographic Survey</option>
                <option value="Drone">Drone Survey</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'piling' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Site Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Piling Type</label>
              <select className={styles.inputField} value={form.formData.pilingType || ''} onChange={e => handleExtraFieldChange('pilingType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Bored Cast In Situ">Bored Cast In Situ</option>
                <option value="DMC">DMC Piling</option>
                <option value="Micro Piling">Micro Piling</option>
                <option value="Pile Testing">Pile Load / Integrity Test</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'soil' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Site Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'ai' && (
        <div className={styles.conditionalBox}>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
            We see you came from an AI Tool. Please tell us how we can assist you with your AI-generated results.
          </p>
        </div>
      )}

      {(form.leadType === 'property_support'"""

content = content.replace("{(form.leadType === 'property_support'", new_blocks)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully.")
