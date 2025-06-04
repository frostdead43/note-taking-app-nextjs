export default function WideColumnFooter({ setSelectedArea }) {
  return (
    <div className="wide-column-footer">
      <button className="save-btn" type="submit">Save Note</button>
      <button className="cancel-btn" type="button" onClick={() => setSelectedArea(null)}>Cancel</button>
    </div>
  );
}