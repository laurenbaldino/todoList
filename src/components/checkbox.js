function Checkbox({ task, markDone, isChecked }) {
  return (
    <form>
      <label>
        <input
          name={task}
          checked={isChecked}
          onChange={markDone}
          type="checkbox"
        />
        <span
          style={{
            textDecoration: isChecked ? "line-through" : "",
            textDecorationColor: "Green",
          }}
        >
          {task}
        </span>
      </label>
    </form>
  );
}

export default Checkbox;
